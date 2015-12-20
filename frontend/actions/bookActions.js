var Dispatcher = require('../dispatcher/dispatcher.js');

module.exports = {
  receiveNewPassage: function (passageObj) {
    Dispatcher.dispatch({
      actionType: "PASSAGE_RECEIVED",
      passage: passageObj
    });
  },
  receiveAllPoems: function (poemsArr) {
    Dispatcher.dispatch({
      actionType: "POEMS_RECEIVED",
      poems: poemsArr
    });
  },
  receiveUserPoems: function (poems) {
    Dispatcher.dispatch({
      actionType: "USER_POEMS_RECEIVED",
      poems: poems
    });
  },
  receiveLikedPoems: function (poems) {
    Dispatcher.dispatch({
      actionType: "LIKED_POEMS_RECEIVED",
      poems: poems
    });
  },
  receivePoem: function (poem) {
    Dispatcher.dispatch({
      actionType: "POEM_RECEIVED",
      poem: poem
    });
  },
  poemDeleted: function (poem) {
    Dispatcher.dispatch({
      actionType: "POEM_DELETED",
      poem: poem
    });
  },
  likeToggled: function (like) {
    Dispatcher.dispatch({
      actionType: "LIKE_TOGGLED",
      like: like
    });
  }
}
