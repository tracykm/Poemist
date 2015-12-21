json.array!(@likes) do |like|
  json.liker like.liker.username
  json.liker_id like.liker_id
  json.created_at like.created_at
  json.poem_id like.poem_id
end
