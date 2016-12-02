var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var UserStore = new Store(AppDispatcher);

var _users = {};
var _currentUserId;

UserStore.all = function(){
  return _users;
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
      window.current_user = {username: user.username, id: user.id};
      addUser(user);
      _currentUserId = payload.user.id;
      UserStore.__emitChange();
      break;
    case "POEM_DELETED":
      removeFromPoemIds(payload.poem);
      removeFromLikedIds(payload.poem);
      UserStore.__emitChange();
      break;
  }
};

function removeFromPoemIds(deleteId){
  var currentUser = UserStore.currentUser();
  var poemIds = currentUser.poem_ids;
  var remainingPoems = [];
  poemIds.forEach(function(poemId){
    if(poemId !== deleteId){
      remainingPoems.push(poemId);
    }
  });
  currentUser.poem_ids = remainingPoems;
}
function removeFromLikedIds(deleteId){
  var currentUser = UserStore.currentUser();
  var poemIds = currentUser.liked_poem_ids;
  var remainingPoems = [];
  poemIds.forEach(function(poemId){
    if(poemId !== deleteId){
      remainingPoems.push(poemId);
    }
  });
  currentUser.liked_poem_ids = remainingPoems;
}

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

module.exports = UserStore;
