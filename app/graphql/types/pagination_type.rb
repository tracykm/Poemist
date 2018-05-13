PaginationType = GraphQL::ObjectType.define do
  name "pagination"
  description "A pagination"

  field :hasMore do
    type !types.Boolean
    resolve -> (pagination, args, ctx) { pagination[:hasMore] }
  end
  field :count do
    type !types.Int
    resolve -> (pagination, args, ctx) { pagination[:count] }
  end
  field :limit do
    type !types.Int
    resolve -> (pagination, args, ctx) { pagination[:limit] }
  end
  field :offset do
    type !types.Int
    resolve -> (pagination, args, ctx) { pagination[:offset] }
  end
  field :items do
    type types[PoemType]
    resolve -> (pagination, args, ctx) { pagination[:items] }
  end
end
