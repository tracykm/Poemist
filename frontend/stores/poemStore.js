var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var PoemStore = new Store(AppDispatcher);

var _poems = {};

var _poem_ids_by_user_liked = {};

PoemStore.all = function(){
  return Object.keys(_poems).map(function(key){return _poems[key];}).reverse();
};

PoemStore.allLiked = function(user_id){
  var liked_poems = [];
  for (idx in _poems) {
    var poem = _poems[idx];
    if(poem.likes[user_id] !== undefined){
      liked_poems.push(poem);
    }
  }
  return liked_poems.reverse();
};

PoemStore.findPoem = function(id){
  return _poems[id];
};

PoemStore.findPoems = function(id_array){
  var result = [];
  id_array.forEach(function(poem_id){
    var poem = _poems[poem_id];
    if(poem){
      result.push(_poems[poem_id]);
    }
  });
  return result.reverse();
};

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
        addPoems(payload.poems);
        PoemStore.__emitChange();
        break;
  }
  switch(payload.actionType) {
      case "LIKE_TOGGLED":
        toggleLike(payload.like);
        PoemStore.__emitChange();
        break;
  }
};

function addPoems(poems){
  poems.forEach(function (poem) {
    addPoem(poem);
  });
}

function removePoem(id){
  delete _poems[id];
}

function addPoem(poem){
  var letters = lettersArray(poem);
  poem.letters = letters;
  // Add code to reformat like here
  if(typeof poem.likes === "undefined"){
    poem.likes = {};
  }
  _poems[poem.id] = poem;
}

function toggleLike(like){
  var poem = PoemStore.findPoem(like.poem_id);
  var current_like = poem.likes[like.liker_id];
  if(typeof current_like === "undefined"){
    poem.likes[like.liker_id] = like;
  }else{
    delete poem.likes[current_like.liker_id];
  }
  // change to one store and find liked through iteration
  _poems[poem.id] = poem;
}

function lettersArray(poem){
  var result = [];
  var highlights = poem.selected_texts;
  poem.passage.split("").forEach(function(letter, idx){
    var letter_obj = {ch: letter, is_selected: isHighlighted(highlights, idx)};
    result.push(letter_obj);
  });
  return result;
}

function isHighlighted(highlights, idx){
  for (var i = 0; i < highlights.length; i++) {
    var highlight = highlights[i];
    if(isBetween(highlight[0], idx, highlight[1])){
      return true;
    }
  }
  return false;
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
