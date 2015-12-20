var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var PoemStore = new Store(AppDispatcher);

var _poems = {};
var _liked_poems = {};

PoemStore.all = function(){
  return _poems
}

PoemStore.allLiked = function(){
  return _liked_poems
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
      addPoems(payload.poems);
      PoemStore.__emitChange();
      break;
  }
  switch(payload.actionType) {
    case "USER_POEMS_RECEIVED":
      addPoems(payload.poems);
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
  switch(payload.actionType) {
      case "LIKED_POEMS_RECEIVED":
        addPoemsToLiked(payload.poems);
        jQuery.extend(_poems, addPoemsToLiked(payload.poems));
        // optomization
        // should add to main poem store too -- concat _liked_poems to _poems
        PoemStore.__emitChange();
        break;
  }
  switch(payload.actionType) {
      case "LIKE_TOGGLED":
        toggleLike(payload.like);
        PoemStore.__emitChange();
        break;
  }
}

function addPoems(poems){
  poems.forEach(function (poem) {
    addPoem(poem)
  });
}

function removePoem(id){
  delete _poems[id];
}

function addPoem(poem){
  addPoemArr(poem, _poems)
}

function addPoemArr(poem, arr){
  var letters = lettersArray(poem);
  poem.letters = letters;
  // Add code to reformat like here
  arr[poem.id] = poem
}

// Duplicate code refactor!
function addPoemsToLiked(poems){
  poems.forEach(function (poem) {
    addPoemArr(poem, _liked_poems)
  });
  return _liked_poems
}

function toggleLike(like){
  var poem = PoemStore.findPoem(like.poem_id);
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

// inclusive on lower isBetween(1,1,5) = true
function isBetween(lower, middle, higher){
  if(middle < lower){
    return false;
  }
  if(middle > higher){
    return false;
  }
  if(middle === higher){
    return false;
  }
  return true;
}

module.exports = PoemStore;
