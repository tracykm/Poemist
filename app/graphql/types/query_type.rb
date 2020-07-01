Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  field :current, UserType do
    description "current user"
    resolve ->(obj, args, ctx) {
      ctx[:current_user]
    }
  end
  field :user do
    type UserType
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      User.find(args[:id])
    }
  end
  field :books do
    type types[BookType]
    resolve ->(obj, args, ctx) {
      Book.all
    }
  end
  field :randomPassage do
    type BookType
    resolve ->(obj, args, ctx) {
      Book.getRandomPassage
    }
  end
  field :getBlankPoem do
    type BlankPoemType
    resolve ->(obj, args, ctx) {
      Book.getRandomPassage
    }
  end
  field :poems do
    type PaginationType
    argument :limit, !types.Int
    argument :offset, !types.Int
    argument :authorId, types.ID
    resolve ->(obj, args, ctx) {
      poems = args[:authorId] ? User.find(args[:authorId]).poems : Poem.all
      poemSlice = poems.order('id desc').limit(args[:limit]).offset(args[:offset])
      hasMore = (args[:limit] + args[:offset]) < poems.count
      return ({ items: poemSlice, limit: args[:limit], offset: args[:offset], count: poems.count, hasMore: hasMore })
    }
  end
  field :poem do
    type PoemType
    argument :id, !types.ID
    resolve -> (obj, args, ctx) {
      Poem.find(args[:id])
    }
  end
end
