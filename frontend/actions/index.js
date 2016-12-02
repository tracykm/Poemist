module.exports = {
  getNewPassage: function() {
    return dispatch => {
      $.ajax({
        url: "api/books/new",
        success: function (book) {
          dispatch({
            type: "PASSAGE_RECEIVED",
            passage: book
          });
        }
      });
    };
  },
  loginUser: function(user) {
    return dispatch => {
      $.ajax({
        url: "api/users/login",
        method: "POST",
        data: {user: user},
        success: function (returnedUser) {
          if(returnedUser.username){
            dispatch({
              type: "CURRENT_USER_RECEIVED",
              user: returnedUser
            });
          }else{
            dispatch({
              type: "LOGIN_ERROR_RECEIVED",
              error: returnedUser
            });
          }
        }
      });
    };
  },


  signUpUser: function(user) {
    return dispatch => {
      $.ajax({
        url: "api/users/",
        method: "POST",
        data: {user: user},
        success: function (returnedUser) {
          if(returnedUser.username){
            dispatch({
              type: "CURRENT_USER_RECEIVED",
              user: returnedUser
            });
          }else{
            dispatch({
              type: "LOGIN_ERROR_RECEIVED",
              error: returnedUser
            });
          }
        },
      });
    };
  }
}
