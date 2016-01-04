var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var UserStore = new Store(AppDispatcher);

var _users = {};
var _currentUserId;

UserStore.all = function(){
  return _users;
};

UserStore.currentUser = function(){
  return _users[_currentUserId];
};

UserStore.find = function(id){
  return _users[id];
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "USER_RECEIVED":
      addUser(payload.user);
      UserStore.__emitChange();
      break;
    case "LOGOUT_RECEIVED":
      _currentUserId = undefined;
      window.current_user = undefined;
      UserStore.__emitChange();
      break;
    case "CURRENT_USER_RECEIVED":
      var user = payload.user;
      window.current_user = {username: user.username, id: user.id}
      addUser(user);
      _currentUserId = payload.user.id;
      UserStore.__emitChange();
      break;
    case "LIKE_TOGGLED":
      toggleLike(payload.like);
      UserStore.__emitChange();
      break;
  }
};

function addUsers(users){
  users.forEach(function (user) {
    addUser(user);
  });
}

function removeUser(id){
  delete _users[id];
}

function addUser(user){
  _users[user.id] = user;
}

function toggleLike(like){
  var currentUser = _users[_currentUserId];
  var liked_poem_ids = currentUser.liked_poem_ids;
  var like_id = like.poem_id;
  var idx = liked_poem_ids.indexOf(like.poem_id);
  if(idx===-1){
    liked_poem_ids.push(like.poem_id);
  }else{
    liked_poem_ids.splice(idx, 1);
  }
  currentUser.liked_poem_ids = liked_poem_ids;
  addUser(currentUser);
}

module.exports = UserStore;
