var ApiActions = require('../actions/apiActions.js');

module.exports = {
  getNewPassage: function () {
    $.ajax({
      url: "api/books/new",
      success: function (book) {
        ApiActions.receiveNewPassage(book);
      }
    });
  },
  getAllPoems: function () {
    $.ajax({
      url: "api/poems",
      success: function (poem) {
        ApiActions.receiveAllPoems(poem);
      }
    });
  },
  getUserPoems: function (id) {
    $.ajax({
      url: "api/poems/by_author/"+id,
      success: function (user) {
        ApiActions.receiveUserPoems(user.poems);
      }
    });
  },
  getUser: function (id) {
    $.ajax({
      url: "api/users/"+id,
      success: function (user) {
        ApiActions.receiveUser(user);
      }
    });
  },
  updateUser: function (user) {
    $.ajax({
      url: "users/"+user.id,
      method: "PATCH",
      data: {user: user},
      success: function (returnedUser) {
        ApiActions.receiveUser(returnedUser);
      }
    });
  },
  getLikedPoems: function (user_id) {
    $.ajax({
      url: "api/poems/by_liker/"+user_id,
      success: function (poems) {
        ApiActions.receiveLikedPoems(poems);
      }
    });
  },
  getPoem: function (id) {
    $.ajax({
      url: "api/poems/"+id,
      success: function (poem) {
        ApiActions.receivePoem(poem);
      }
    });
  },
  createPoem: function (poem_params) {
    // patch for api expecting flat array
    var selected_texts = get_selects(poem_params.letters);
    poem_params.selected_texts = selected_texts;
    poem_params.letters = [];
    $.ajax({
      url: "api/poems",
      method: "POST",
      data: {poem: poem_params},
      success: function (poem) {
      }
    });
  },
  updatePoem: function (poem_params) {
    // patch for api expecting flat array
    var selected_texts = get_selects(poem_params.letters);
    poem_params.selected_texts = selected_texts;
    poem_params.letters = [];
    $.ajax({
      url: "api/poems/"+poem_params.id,
      method: "PATCH",
      data: {poem: poem_params},
      success: function (poem) {
      }
    });
  },
  deletePoem: function (id) {
    $.ajax({
      url: "api/poems/"+id,
      method: "DELETE",
      success: function (data) {
        ApiActions.poemDeleted(id);
      }
    });
  },
  logout: function () {
    $.ajax({
      url: "session/",
      method: "DELETE",
      success: function (data) {
      }
    });
  },
  getMyPoemLikes: function (likes) {
    $.ajax({
      url: "api/likes/my_poem_likes",
      method: "GET",
      data: {likes: likes},
      success: function (returnedLikes) {
        ApiActions.receiveMyPoemLikes(returnedLikes);
      }
    });
  },
  toggleLike: function (like) {
    $.ajax({
      url: "api/likes",
      method: "POST",
      data: {like: like},
      success: function (returnedLike) {
        ApiActions.likeToggled(returnedLike);
      }
    });
  }
};

function get_selects(letters){
  var highlights = [];
  var selected = false;
  letters.forEach(function(letter, idx){
    if(selected !== letter.is_selected){
      highlights.push(idx);
      selected = !selected;
    }
  });
  return highlights;
}
