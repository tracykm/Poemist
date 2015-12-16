var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var PoemStore = new Store(AppDispatcher);

var _poems = {};

PoemStore.all = function(){
  return _poems
}

PoemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "POEMS_RECEIVED":
      _poems = payload.poems
      PoemStore.__emitChange();
      break;
  }

}

module.exports = PoemStore;
