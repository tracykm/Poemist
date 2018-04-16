# TextChunk = GraphQL::ObjectType.define do
#   name "TextChunk"
#   description "A TextChunk"
#
#   field :text, types.String, hash_key: 'text'
#   field :isSelected, types.Boolean, hash_key: 'is_selected'
# end

TextChunk = GraphQL::ObjectType.define do
  name "TextChunk"
  description "A TextChunk, a passage and where it is selected or not"

  field :text do
    type types.String
    resolve -> (obj, args, ctx) { obj[:text] }
  end
  field :isSelected do
    type types.Boolean
    resolve -> (obj, args, ctx) { obj[:is_selected] }
  end
end

PoemType = GraphQL::ObjectType.define do
  name "Poem"
  description "Collection of text chunks"

  field :id, !types.Int
  field :styleId, !types.Int, property: :style_id
  field :passage, !types.String
  field :author do
    type types.String
    resolve -> (poem, args, ctx) { poem.author.username }
  end
  field :authorId do
    type types.Int
    resolve -> (poem, args, ctx) { poem.author.id }
  end
  field :backgroundId do
    type types.Int
    resolve -> (poem, args, ctx) { poem.style.background_id }
  end
  field :colorRange do
    type types.Int
    resolve -> (poem, args, ctx) { poem.style.color_range }
  end
  field :centered do
    type types.Int
    resolve -> (poem, args, ctx) { poem.style.centered }
  end
  field :textChunks do
    type types[TextChunk]
    resolve -> (poem, args, ctx) { poem.get_poem_text }
  end
  field :createdAt do
    type types.Int
    resolve -> (poem, args, ctx) { poem.created_at.to_i }
  end
  field :updatedAt do
    type types.Int
    resolve -> (poem, args, ctx) { poem.updated_at.to_i }
  end
end
