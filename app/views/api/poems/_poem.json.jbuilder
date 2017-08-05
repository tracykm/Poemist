json.extract!(
  poem,
  :id, :book_id, :created_at
)

json.book_title poem.book.title

json.author_id poem.author_id
json.author poem.author.username


json.text poem.get_poem_text

json.centered poem.style.centered
json.color_range poem.style.color_range
json.background_id poem.style.background_id
json.font_set_id poem.style.font_set_id

json.likes do
  poem.likes.each{ |like| json.set! like.liker_id, like }
end
