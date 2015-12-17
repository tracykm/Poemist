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
  switch(payload.actionType) {
    case "USER_POEMS_RECEIVED":
      _poems = payload.poems
      PoemStore.__emitChange();
      break;
  }
  switch(payload.actionType) {
      case "POEM_DELETED":
        debugger
        removePoem(payload.poem);
        PoemStore.__emitChange();
        break;
    }
}

// Inefficent change store to hash later
function removePoem(id){
  var updatedPoems = [];
  _poems.forEach(function(poem){
    debugger
    if(poem.id !== id){
      updatedPoems.push(poem);
    }
  });
  _poems = updatedPoems;
}

module.exports = PoemStore;
