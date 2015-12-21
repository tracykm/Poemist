json.array!(@likes) do |like|
  json.liker like.liker.username
  json.created_at like.created_at

  poem_slice = ""
  i = 0
  while(poem_slice.length < 15)
    highlight = like.poem.selected_texts[i]
    poem_slice += like.poem.passage[highlight.start_idx..highlight.end_idx]
    i += 1
  end
  json.poem_slice poem_slice
end
