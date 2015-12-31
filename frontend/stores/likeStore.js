var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var LikeStore = new Store(AppDispatcher);

// for Notifications - only current users
var _likes = [];

LikeStore.all = function(){
  return _likes.slice();
};

LikeStore.recentLikes = function(){
  return _likes.slice(_likes.length-3, _likes.length).reverse();
};

LikeStore.newLikes = function(){
  var newLikes = [];
  for (var i = 0; i < _likes.length; i++) {
    var like = _likes[i];
    if(like.seen === false){
      newLikes.push(like.id);
    }
  }
  return newLikes
};

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
      debugger
      // _likes = notifications;
      LikeStore.__emitChange();
      break;
    case "LIKE_TOGGLED":
      // LikeStore.__emitChange();
      break;
  }
};

module.exports = LikeStore;
