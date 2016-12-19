module.exports = (currentUser = null, action) => {
  switch (action.type) {
    case 'CURRENT_USER_RECEIVED':
      return action.user;
    case 'LIKE_TOGGLED':
      const newCurrentUser = toggleLike(currentUser, action.like);
      return newCurrentUser;
    default:
      return currentUser;
  }
};


function toggleLike(currentUser, like){
  const liked_poem_ids = currentUser.liked_poem_ids;
  const like_id = like.poem_id;
  const idx = liked_poem_ids.indexOf(like.poem_id);
  if (idx === -1) {
    liked_poem_ids.push(like.poem_id);
  } else {
    liked_poem_ids.splice(idx, 1);
  }
  const newCurrentUser = { ...currentUser, liked_poem_ids };
  return newCurrentUser;
}
