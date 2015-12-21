var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var LikeStore = new Store(AppDispatcher);

// for Notifications - only current users
var _likes = [];

LikeStore.all = function(){
  return _likes.slice();
};

LikeStore.recentLikes = function(){
  return _likes.slice(0,3);
};

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "MY_POEM_LIKES_RECEIVED":
      _likes = payload.likes;
      LikeStore.__emitChange();
      break;
  }
};

module.exports = LikeStore;
