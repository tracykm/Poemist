json.extract!( @user, :id, :username)

json.poem_ids @user.poem_ids

json.liked_poems @user.liked_poem_ids
