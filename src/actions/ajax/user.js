// import $ from 'jQuery';
// const baseUrl = window.location.protocol + '//' + window.location.host + '/api';
const baseUrl = 'http://localhost:3000/api';

function recieveCurrentUser(dispatch, returnedUser) {
  if (returnedUser.username) {
    dispatch({
      type: 'CURRENT_USER_RECEIVED',
      userId: returnedUser.id,
    });
    dispatch({
      type: 'USER_RECEIVED',
      user: returnedUser,
    });
  } else {
    dispatch({
      type: 'LOG_IN_ERROR_RECEIVED',
      error: returnedUser,
    });
  }
}

function recieveUser(dispatch, returnedUser) {
  dispatch({
    type: 'USER_RECEIVED',
    user: returnedUser,
  });
}

function clearUser(dispatch) {
  dispatch({
    type: 'USER_LOGGED_OUT',
  });
}

module.exports = {
  getCurrentUser: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/users/current`,
        method: 'GET',
        success: recieveCurrentUser.bind(null, dispatch),
      });
    }
  ),
  getUser: userId => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/users/${userId}`,
        method: 'GET',
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
  logInUser: user => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/users/logIn`,
        method: 'POST',
        data: { user },
        success: recieveCurrentUser.bind(null, dispatch),
      });
    }
  ),
  logoutUser: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/users/logout`,
        method: 'DELETE',
        success: clearUser.bind(null, dispatch),
      });
    }
  ),
  signUpUser: user => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/users/`,
        method: 'POST',
        data: { user },
        success: recieveCurrentUser.bind(null, dispatch),
      });
    }
  ),
};
