BookType = GraphQL::ObjectType.define do
  name "book"
  description "A book"

  field :title, !types.String
  field :author, !types.String
  field :text, !types.String
  field :id, !types.Int
  field :createdAt do
    type types.Int
    resolve -> (book, args, ctx) { book.created_at.to_i }
  end
  field :updatedAt do
    type types.Int
    resolve -> (book, args, ctx) { book.updated_at.to_i }
  end

  field :poems do
    type types[PoemType]
    resolve -> (book, args, ctx) { book.poems }
  end
end
