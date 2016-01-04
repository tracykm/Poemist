json.partial! 'user', user: @user

json.notifications do
  @user.poem_likes.each do |like|
    if like.liker_id != @user.id
      json.partial!('api/likes/show', like: like)
    end
  end
end
