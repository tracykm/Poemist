var Dispatcher = require('../dispatcher/dispatcher.js');
var ApiUtil = require('../util/apiUtil.js');

module.exports = {
  receiveNewPassage: function (passageObj) {
    Dispatcher.dispatch({
      actionType: "PASSAGE_RECEIVED",
      passage: passageObj
    });
  },
  // getAllPoems: function (page_num) {
  //   ApiUtil.boo();
  //   // ApiUtil.getAllPoems(page_num);
  // },
  receiveAllPoems: function (poemsArr) {
    Dispatcher.dispatch({
      actionType: "POEMS_RECEIVED",
      poems: poemsArr
    });
  },
  allPoemsLoaded: function () {
    Dispatcher.dispatch({
      actionType: "ALL_POEMS_LOADED",
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
  recieveLoginError: function (error) {
    Dispatcher.dispatch({
      actionType: "LOGIN_ERROR_RECEIVED",
      error: error
    });
  },
  loggedOut: function (error) {
    Dispatcher.dispatch({
      actionType: "LOGOUT_RECEIVED"
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
  },
  receiveSeenLikes: function (likesSeen) {
    Dispatcher.dispatch({
      actionType: "LIKES_SEEN_RECEIVED",
      likesSeen: likesSeen
    });
  }
};
