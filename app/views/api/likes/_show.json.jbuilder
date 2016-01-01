my_id = like.id
like = {
  id: like.id,
  liker: like.liker.username,
  liker_id: like.liker_id,
  created_at: like.created_at,
  poem_id: like.poem_id,
  seen: like.seen
}
json.set! my_id, like
