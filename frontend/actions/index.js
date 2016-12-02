function recievePassage(dispatch, book) {
  dispatch({
    type: 'PASSAGE_RECEIVED',
    passage: book,
  });
}

function recieveUser(dispatch, returnedUser) {
  if (returnedUser.username) {
    dispatch({
      type: 'CURRENT_USER_RECEIVED',
      user: returnedUser,
    });
  } else {
    dispatch({
      type: 'LOGIN_ERROR_RECEIVED',
      error: returnedUser,
    });
  }
}

module.exports = {
  getNewPassage: () => (
    (dispatch) => {
      $.ajax({
        url: 'api/books/new',
        success: recievePassage.bind(null, dispatch),
      });
    }
  ),
  loginUser: (user) => (
    (dispatch) => {
      $.ajax({
        url: 'api/users/login',
        method: 'POST',
        data: { user },
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
  signUpUser: (user) => (
    dispatch => {
      $.ajax({
        url: 'api/users/',
        method: 'POST',
        data: { user },
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
};
