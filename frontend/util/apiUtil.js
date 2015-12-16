var ApiActions = require('../actions/bookActions.js');

module.exports = {
  getNewPassage: function () {
    $.ajax({
      url: "api/books/1",
      success: function (book) {
        ApiActions.receiveNewPassage(book["book"]);
      }
    })
  },
}
