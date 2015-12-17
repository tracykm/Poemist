var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var BookStore = new Store(AppDispatcher);

var _passage = {};

BookStore.all = function(){
  return _passage
}

BookStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "PASSAGE_RECEIVED":
      _passage = payload.passage
      BookStore.__emitChange();
      break;
  }
}

module.exports = BookStore;
