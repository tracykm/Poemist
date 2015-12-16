json.extract!(
  poem,
  :id, :passage, :book_id
)

json.author_id poem.author.username

# json.selected_texts do
#   json.array!(poem.selected_texts, :start_idx, :end_idx)
# end
json.selected_texts do
  json.array!(poem.selected_texts) do |selected_texts|
    json.extract!(selected_texts,
    :start_idx, :end_idx)
  end
end
