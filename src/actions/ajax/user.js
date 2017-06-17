import request from 'src/actions/superagent'
// const baseUrl = window.location.protocol + '//' + window.location.host + '/api'
const baseUrl = 'http://localhost:3000/api'

function recieveCurrentUser(dispatch, returnedUser) {
  if (returnedUser.username) {
    dispatch({
      type: 'CURRENT_USER_RECEIVED',
      userId: returnedUser.id,
    })
    dispatch({
      type: 'USER_RECEIVED',
      user: returnedUser,
    })
  } else {
    dispatch({
      type: 'LOG_IN_ERROR_RECEIVED',
      error: returnedUser,
    })
  }
}

function recieveUser(dispatch, returnedUser) {
  dispatch({
    type: 'USER_RECEIVED',
    user: returnedUser,
  })
}

function clearUser(dispatch) {
  dispatch({
    type: 'USER_LOGGED_OUT',
  })
}

module.exports = {
  _getCurrentUser: () => (
    (dispatch) => {
      request
        .get(`${baseUrl}/users/current`)
        .end((err, res) => {
          if (err) { return }
          recieveCurrentUser(dispatch, res.body)
        })
    }
  ),
  _getUser: userId => (
    (dispatch) => {
      request
        .get(`${baseUrl}/users/${userId}`)
        .end((err, res) => {
          if (err) { return }
          recieveUser(dispatch, res.body)
        })
    }
  ),
  _logInUser: user => (
    (dispatch) => {
      request
        .post(`${baseUrl}/users/login`)
        .send(user)
        .setCsrfToken()
        .end((err, res) => {
          if (err) { return }
          recieveCurrentUser(dispatch, res.body)
        })
    }
  ),
  _logoutUser: () => (
    (dispatch) => {
      request
        .delete(`${baseUrl}/users/logout`)
        .setCsrfToken()
        .end((err, res) => {
          if (err) { return }
          clearUser(dispatch, res.body)
        })
    }
  ),
  _signUpUser: user => (
    (dispatch) => {
      request
        .post(`${baseUrl}/users/`)
        .send(user)
        .setCsrfToken()
        .end((err, res) => {
          if (err) { return }
          recieveCurrentUser(dispatch, res.body)
        })
    }
  ),
}
