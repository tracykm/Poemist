var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var LikeStore = new Store(AppDispatcher);

// for Notifications - only current users
var _likes = {};

LikeStore.all = function(){
  return Object.keys(_likes).map(function(key){return _likes[key];});
};

LikeStore.recentLikes = function(){
  var likesArr = Object.keys(_likes).map(function(key){return _likes[key];}).reverse();
  return likesArr.slice(0, 3)
  // debugger
};

LikeStore.newLikes = function(){
  var newLikes = [];
  for (var id in _likes) {
    var like = _likes[id];
    if(like.seen === false){
      newLikes.push(id);
    }
  }
  return newLikes
};

function sortNumberReverse(a,b) {
    return b - a;
}

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "MY_POEM_LIKES_RECEIVED":
      _likes = payload.likes;
      LikeStore.__emitChange();
      break;
    case "CURRENT_USER_RECEIVED":
      var notifications = payload.user.notifications
      _likes = notifications;
      LikeStore.__emitChange();
      break;
    case "LIKES_SEEN_RECEIVED":
      var likes = payload.likesSeen
      addLikes(likes);
      // _likes = notifications;
      LikeStore.__emitChange();
      break;
    case "LIKE_TOGGLED":
      // LikeStore.__emitChange();
      break;
  }
};

function addLikes(newLikes){
  for (var id in newLikes) {
    _likes[id] = newLikes[id];
  }
}

module.exports = LikeStore;
