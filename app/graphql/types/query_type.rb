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
  field :poems, types[PoemType] do
    description "poems"
    resolve ->(obj, args, ctx) {
      Poem.all
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
