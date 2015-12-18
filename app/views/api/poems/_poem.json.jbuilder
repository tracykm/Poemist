json.extract!(
  poem,
  :id, :book_id
)

json.book_title poem.book.title

json.author_id poem.author_id
json.author poem.author.username

json.letters do
  json.array!(poem.letters) do |letter|
    json.extract!(
      letter,
      :position_idx, :ch, :is_selected, :is_italic
    )
  end
end

json.style do
  if(poem.style)
    json.extract!(
      poem.style,
      :centered, :color_range, :background_id, :font_set_id
    )
  else
    "no style"
  end
end
