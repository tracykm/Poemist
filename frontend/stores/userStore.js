var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var PoemStore = require('./poemStore')

var UserStore = new Store(AppDispatcher);

var _users = {};

UserStore.all = function(){
  return _users
}

UserStore.find = function(id){
  return _users[id]
}

UserStore.getUsersPoems = function(user_id){
  var user = UserStore.find(user_id);
  return PoemStore.findPoems(user.poem_ids);
}

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "USER_RECEIVED":
      addUser(payload.user)
      UserStore.__emitChange();
      break;
  }
}

function addUsers(users){
  users.forEach(function (user) {
    addUser(user)
  });
}

function removeUser(id){
  delete _users[id];
}

function addUser(user){
  _users[user.id] = user
  console.log("_users", _users);
}

module.exports = UserStore;
