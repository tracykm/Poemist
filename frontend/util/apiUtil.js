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
  getAllPoems: function (page_num) {
    $.ajax({
      url: "api/poems/by_page/"+page_num,
      success: function (poem) {
        ApiActions.receiveAllPoems(poem);
      }
    });
  },
  getUserPoems: function (id, page) {
    $.ajax({
      url: "api/poems/by_author/"+id,
      data: {page_num: page},
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
  getCurrentUser: function () {
    $.ajax({
      url: "api/users/current/",
      success: function (user) {
        ApiActions.receiveCurrentUser(user);
      }
    });
  },
  updateUser: function (user) {
    $.ajax({
      url: "users/"+user.id,
      method: "PATCH",
      data: {user: user},
      success: function (returnedUser) {
        this.getCurrentUser();
      }
    });
  },
  getLikedPoems: function (user_id, page_num) {
    $.ajax({
      url: "api/poems/by_liker/"+user_id,
      data: {page_num: page_num},
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
    $.ajax({
      url: "api/poems",
      method: "POST",
      data: {poem: poem_params},
      success: function (poem) {
      }
    });
  },
  updatePoem: function (poem_params) {
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
