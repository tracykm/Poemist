json.partial! 'user', user: @user

json.notifications @user.poem_likes
