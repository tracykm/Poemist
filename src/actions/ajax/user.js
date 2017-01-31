const baseUrl = window.location.protocol + '//' + window.location.host;
const $ = window.$;

function recieveUser(dispatch, returnedUser) {
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
      type: 'LOGIN_ERROR_RECEIVED',
      error: returnedUser,
    });
  }
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
        url: `${baseUrl}/api/users/current`,
        method: 'GET',
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
  loginUser: user => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/users/login`,
        method: 'POST',
        data: { user },
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
  logoutUser: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/users/logout`,
        method: 'DELETE',
        success: clearUser.bind(null, dispatch),
      });
    }
  ),
  signUpUser: user => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/users/`,
        method: 'POST',
        data: { user },
        success: recieveUser.bind(null, dispatch),
      });
    }
  ),
};
