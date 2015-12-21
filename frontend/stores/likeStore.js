var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var LikeStore = new Store(AppDispatcher);

// for Notifications - only current users
var _likes = {};

LikeStore.all = function(){
  return _likes
}

LikeStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  //   case "PASSAGE_RECEIVED":
  //     _likes = payload.passage
  //     LikeStore.__emitChange();
  //     break;
  // }
}

module.exports = LikeStore;
