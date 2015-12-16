json.book do
  json.id @book.id
  json.text @book.text[0..300]
end
