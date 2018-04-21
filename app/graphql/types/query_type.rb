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
  field :poems do
    type types[PoemType]
    argument :limit, !types.Int
    argument :offset, !types.Int
    argument :authorId, types.Int
    resolve ->(obj, args, ctx) {
      poems = args[:authorId] ? User.find(args[:authorId]).poems : Poem.all
      poems.order('id desc').limit(args[:limit]).offset(args[:offset])
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
