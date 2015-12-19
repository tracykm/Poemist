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

PoemStore.getByUserId = function(id){
  usersPoems = {}
  for(var poemId in _poems) {
    var poem = _poems[poemId];
    if(poem.author_id == id){
      usersPoems[poem.id] = poem
    }
  }
  return usersPoems
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
  // _poems = {}
  poems.forEach(function (poem) {
    addPoem(poem)
  });
}

function removePoem(id){
  delete _poems[id];
}

function addPoem(poem){
  var letters = lettersArray(poem);
  poem.letters = letters;
  _poems[poem.id] = poem
}

function lettersArray(poem){
  var result = [];
  var highlights = poem.selected_texts;
  poem.passage.split("").forEach(function(letter, idx){
    letter_obj = {ch: letter, is_selected: isHighlighted(highlights, idx)}
    result.push(letter_obj);
  });
  return result
}

function isHighlighted(highlights, idx){
  for (var i = 0; i < highlights.length; i++) {
    var highlight = highlights[i];
    if(isBetween(highlight[0], idx, highlight[1])){
      return true;
    }
  }
  return false
}

// inclusive isBetween(1,1,5) = true
function isBetween(lower, middle, higher){
  if(middle < lower){
    return false;
  }
  if(middle > higher){
    return false;
  }
  return true;
}

module.exports = PoemStore;
