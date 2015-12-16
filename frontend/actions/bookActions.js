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
  }
}
