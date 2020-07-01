LikeType = GraphQL::ObjectType.define do
  name "like"
  description "A like"

  field :seen, !types.Boolean
  field :id, !types.Int
  field :createdAt do
    type types.Int
    resolve -> (like, args, ctx) { like.created_at.to_i }
  end
  field :updatedAt do
    type types.Int
    resolve -> (like, args, ctx) { like.updated_at.to_i }
  end

  field :poem do
    type PoemType
    resolve -> (like, args, ctx) { like.poem }
  end

  field :liker do
    type UserType
    resolve -> (like, args, ctx) { like.liker }
  end
end
