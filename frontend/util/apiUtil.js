var ApiActions = require('../actions/apiActions.js');

module.exports = {
  // boo: function () {
  // },
  getNewPassage: function () {
    showLoading();
    $.ajax({
      url: "api/books/new",
      success: function (book) {
        ApiActions.receiveNewPassage(book);
        hideLoading();
      }
    });
  },
  getAllPoems: function (page_num) {
    // showLoading();
    $.ajax({
      url: "api/poems/by_page/"+page_num,
      success: function (poem) {
        console.log("poem", poem);
        if(poem === "empty"){
          console.log("empty");
        }
        ApiActions.receiveAllPoems(poem);
      },
      error: function(err){
        ApiActions.allPoemsLoaded();
      }
    });
  },
  getUserPoems: function (id, page) {
    // showLoading();
    $.ajax({
      url: "api/poems/by_author/"+id,
      data: {page_num: page},
      success: function (user) {
        if(user === "empty"){
          // alert("empty")
        }
        ApiActions.receiveUserPoems(user.poems);
        // hideLoading();
      },
      error: function(err){
        ApiActions.allPoemsLoaded();
      }
    });
  },
  getLikedPoems: function (user_id, page_num) {
    $.ajax({
      url: "api/poems/by_liker/"+user_id,
      data: {page_num: page_num},
      success: function (poems) {
        ApiActions.receiveLikedPoems(poems);
      },
      error: function(err){
        ApiActions.allPoemsLoaded();
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
        if(user.username){ // protect from 'undefined' current user
          ApiActions.receiveCurrentUser(user);
        }
      }
    });
  },
  updateUser: function (user) {
    var that = this;
    $.ajax({
      url: "users/"+user.id,
      method: "PATCH",
      data: {user: user},
      success: function (returnedUser) {
        that.getCurrentUser();
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
    var that = this;
    $.ajax({
      url: "api/poems",
      method: "POST",
      data: {poem: poem_params},
      success: function (poem_id) {
        that.getPoem(poem_id);
      }
    });
  },
  updatePoem: function (poem_params) {
    var that = this;
    $.ajax({
      url: "api/poems/"+poem_params.id,
      method: "PATCH",
      data: {poem: poem_params},
      success: function (poem_id) {
        that.getPoem(poem_id);
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
      url: "api/users/logout",
      method: "DELETE",
      success: function (data) {
        ApiActions.loggedOut();
      },
      error: function (data) {
      }
    });
  },
  logUserIn: function (user) {
    var that = this;
    $.ajax({
      url: "api/users/login",
      method: "POST",
      data: {user: user},
      success: function (returnedUser) {
        if(returnedUser.username){
          ApiActions.receiveCurrentUser(returnedUser);
          if(returnedUser.username==="Guest"){
            that.getAllPoems();
          }
        }else{
          ApiActions.recieveLoginError(returnedUser);
        }
      }
      // error: function (data) {
      //   ApiActions.recieveLoginError(data.responseText)
      // }
    });
  },
  logFacbookUserIn: function (user) {
    var that = this;
    $.ajax({
      url: "auth/facebook",
      method: "GET",
      data: {user: user},
      success: function (returnedUser) {
        if(returnedUser.username){
          ApiActions.receiveCurrentUser(returnedUser);
          if(returnedUser.username==="Guest"){
            that.getAllPoems();
          }
        }else{
          ApiActions.recieveLoginError(returnedUser);
        }
      }
      // error: function (data) {
      //   ApiActions.recieveLoginError(data.responseText)
      // }
    });
  },
  signUpUser: function (user) {
    $.ajax({
      url: "api/users/",
      method: "POST",
      data: {user: user},
      success: function (data) {
        if(!data.username){
          ApiActions.recieveLoginError(data);
        }else{
          ApiActions.receiveCurrentUser(data);
        }
      },
      error: function (data) {
        ApiActions.recieveLoginError(data.responseText);
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
  },
  markLikesSeen: function (like_ids) {
    $.ajax({
      url: "api/likes/mark_seen",
      method: "PATCH",
      data: {like_ids: like_ids},
      success: function (seenLikes) {
        ApiActions.receiveSeenLikes(seenLikes);
      }
    });
  }
};

function showLoading(){
  var loadingSpinner = document.querySelector(".spinner");
  if(loadingSpinner){
    loadingSpinner.className = loadingSpinner.className + " show";
  }
}
function hideLoading(){
  var loadingSpinner = document.querySelector(".spinner");
  loadingSpinner.className = loadingSpinner.className.replace(/\bshow\b/,'');
}
