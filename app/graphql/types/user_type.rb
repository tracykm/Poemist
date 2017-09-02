UserType = GraphQL::ObjectType.define do
  name "User"
  description "A user"

  field :id, !types.Int
  field :username, !types.String
  field :poems, types[PoemType]
  field :sessionToken do
    type types.String
    resolve -> (obj, args, ctx) {
      obj.session_token
    }
  end
  field :poemsWrittenCount do
    type types.Int

    resolve -> (obj, args, ctx) {
      obj.poems.length
    }
  end
  field :createdAt do
    type types.Int

    resolve -> (obj, args, ctx) {
      obj.created_at.to_i
    }
  end
  field :updatedAt do
    type types.Int

    resolve -> (obj, args, ctx) {
      obj.updated_at.to_i
    }
  end
end
