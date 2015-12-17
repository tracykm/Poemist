json.extract!(
  poem,
  :id, :passage, :book_id, :style
)

json.author_id poem.author_id
json.author poem.author.username

selects = []
poem.selected_texts.each do |selected_text|
  puts "--------#{selected_text.start_idx}"
  selects << selected_text.start_idx
  selects << selected_text.end_idx
end
json.selected_texts selects
# Parse starts and stops to flat array
