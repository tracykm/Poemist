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
  getAllPoems: function () {
    $.ajax({
      url: "api/poems",
      success: function (poem) {
        ApiActions.receiveAllPoems(poem);
      }
    })
  },
  createPoem: function (poem_params) {
    $.ajax({
      url: "api/poems",
      method: "POST",
      data: {poem: poem_params},
      success: function (poem) {
        console.log("successful createPoem")
      }
    })
  }
}
