var ApiActions = require('../actions/bookActions.js');

module.exports = {
  getNewPassage: function () {
    $.ajax({
      url: "api/books/new",
      success: function (book) {
        ApiActions.receiveNewPassage(book);
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
  getUserPoems: function (id) {
    $.ajax({
      url: "api/users/"+id,
      success: function (user) {
        console.log(user);
        ApiActions.receiveUserPoems(user.poems);
      }
    })
  },
  getPoem: function (id) {
    $.ajax({
      url: "api/poems/"+id,
      success: function (poem) {
        ApiActions.receivePoem(poem);
      }
    })
  },
  createPoem: function (poem) {
    // patch for api expecting flat array
    var lettersArr = Object.keys(poem.letters).map(function(key){return poem.letters[key]});
    poem.letters = lettersArr;
    $.ajax({
      url: "api/poems",
      method: "POST",
      data: {poem: poem},
      success: function (poem) {
      }
    })
  },
  updatePoem: function (poem_params) {
    // patch for api expecting flat array
    console.log("poem_params",poem_params);
    poem_params.selected_texts = [].concat.apply([], poem_params.selected_texts);
    $.ajax({
      url: "api/poems/"+poem_params.id,
      method: "PATCH",
      data: {poem: poem_params},
      success: function (poem) {
        console.log("success! "+poem);
      }
    })
  },
  deletePoem: function (id) {
    $.ajax({
      url: "api/poems/"+id,
      method: "DELETE",
      success: function (data) {
        ApiActions.poemDeleted(id);
      }
    })
  }
}
