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
  createPoem: function (poem_params) {
    // patch for api expecting flat array
    var selected_texts = get_selects(poem_params.letters)
    poem_params.selected_texts = selected_texts;
    poem_params.letters = [];
    $.ajax({
      url: "api/poems",
      method: "POST",
      data: {poem: poem_params},
      success: function (poem) {
      }
    })
  },
  updatePoem: function (poem_params) {
    // patch for api expecting flat array
    var selected_texts = get_selects(poem_params.letters)
    poem_params.selected_texts = selected_texts;
    poem_params.letters = [];
    console.log("poem_params",poem_params);
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

function get_selects(letters){
  highlights = [];
  var selected = false;
  debugger
  letters.forEach(function(letter, idx){
    if(selected !== letter.is_selected){
      highlights.push(idx);
      selected = !selected;
    }
  });
  return highlights;
}
