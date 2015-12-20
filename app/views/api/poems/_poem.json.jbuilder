json.extract!(
  poem,
  :id, :passage, :book_id
)

json.book_title poem.book.title

json.author_id poem.author_id
json.author poem.author.username

selects = []
poem.selected_texts.each do |selected_text|
  selects << [selected_text.start_idx, selected_text.end_idx]
end
json.selected_texts selects
# Parse starts and stops to flat array

json.centered poem.style.centered
json.color_range poem.style.color_range
json.background_id poem.style.background_id
json.font_set_id poem.style.font_set_id

json.likes do
  json.array!(poem.likes) do |like|
    json.extract!(like, :liker_id, :created_at)
  end
end
