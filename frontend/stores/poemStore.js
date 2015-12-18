var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var PoemStore = new Store(AppDispatcher);

var _poems = {};

PoemStore.all = function(){
  return _poems
}

PoemStore.findPoem = function(id){
  return _poems[id]
}

PoemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "POEMS_RECEIVED":
      resetPoems(payload.poems);
      PoemStore.__emitChange();
      break;
  }
  switch(payload.actionType) {
    case "USER_POEMS_RECEIVED":
      resetPoems(payload.poems);
      PoemStore.__emitChange();
      break;
  }
  switch(payload.actionType) {
      case "POEM_DELETED":
        removePoem(payload.poem);
        PoemStore.__emitChange();
        break;
  }
  switch(payload.actionType) {
      case "POEM_RECEIVED":
        addPoem(payload.poem);
        PoemStore.__emitChange();
        break;
  }
}

function resetPoems(poems){
  _poems = {}
  poems.forEach(function (poem) {
    _poems[poem.id] = poem;
  });
}

function removePoem(id){
  delete _poems[id];
}

function addPoem(poem){
  _poems[poem.id] = poem
}

module.exports = PoemStore;
