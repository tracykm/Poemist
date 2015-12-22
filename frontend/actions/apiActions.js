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
  receiveUser: function (user) {
    Dispatcher.dispatch({
      actionType: "USER_RECEIVED",
      user: user
    });
  },
  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: "CURRENT_USER_RECEIVED",
      user: user
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
  receiveMyPoemLikes: function (likes) {
    Dispatcher.dispatch({
      actionType: "MY_POEM_LIKES_RECEIVED",
      likes: likes
    });
  },
  likeToggled: function (like) {
    Dispatcher.dispatch({
      actionType: "LIKE_TOGGLED",
      like: like
    });
  }
}
