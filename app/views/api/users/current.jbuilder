json.partial! 'user', user: @user

json.notifications do
  @user.poem_likes.each{ |like|
    json.partial!('api/likes/show', like: like)
  }
end
