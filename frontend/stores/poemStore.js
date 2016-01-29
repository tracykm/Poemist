var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var myMixables = require('../util/myMixables');
var PoemStore = new Store(AppDispatcher);

var _poems = {};

var _more_poems = true;

var _poem_ids_by_user_liked = {};

PoemStore.all = function(){
  return Object.keys(_poems).map(function(key){return _poems[key];}).reverse();
};

PoemStore.findPoem = function(id){
  return _poems[id];
};

PoemStore.findPoems = function(id_array){
  // id_array = id_array.sort(sortNumberReverse);
  var result = [];
  id_array.forEach(function(poem_id){
    var poem = _poems[poem_id];
    if(poem){
      result.push(_poems[poem_id]);
    }
  });
  return result;
};


PoemStore.areMorePoems = function(){
  return _more_poems;
};

function sortNumberReverse(a,b) {
    return b - a;
}

PoemStore.__onDispatch = function (payload){
  switch(payload.actionType) {
    case "POEMS_RECEIVED":
      addPoems(payload.poems);
      PoemStore.__emitChange();
      break;
    case "USER_POEMS_RECEIVED":
      addPoems(payload.poems);
      PoemStore.__emitChange();
      break;
      case "POEM_DELETED":
        removePoem(payload.poem);
        PoemStore.__emitChange();
        break;
      case "POEM_RECEIVED":
        addPoem(payload.poem);
        PoemStore.__emitChange();
        break;
      case "LIKED_POEMS_RECEIVED":
        addPoems(payload.poems);
        PoemStore.__emitChange();
        break;
      case "LIKE_TOGGLED":
        toggleLike(payload.like);
        PoemStore.__emitChange();
        break;
      case "ALL_POEMS_LOADED":
      // console.log("ALL_POEMS_LOADED");
        _more_poems = false;
        PoemStore.__emitChange();
        break;
      case "RESET_POEMS":
         _poems = {};
         _more_poems = true;
         PoemStore.__emitChange();
       break;
  }
};

function addPoems(poems){
  _more_poems = true;
  poems.forEach(function (poem) {
    addPoem(poem);
  });
}

function removePoem(id){
  delete _poems[id];
}

function addPoem(poem){
  // Add code to reformat like here
  if(typeof poem.likes === "undefined"){
    poem.likes = {};
  }
  _poems[poem.id] = poem;
}

function toggleLike(like){
  var poem = _poems[like.poem_id];
  var current_like = poem.likes[like.liker_id];
  if(typeof current_like === "undefined"){
    poem.likes[like.liker_id] = like;
  }else{
    delete poem.likes[current_like.liker_id];
  }
  _poems[poem.id] = poem;
}


module.exports = PoemStore;
