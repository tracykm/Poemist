import { camelizeKeys } from 'humps'
import { from } from 'seamless-immutable'
import request from 'src/ducks/superagent'

const baseUrl = 'http://localhost:3000/api'

export default (state = from({}), action) => {
  switch (action.type) {
    case 'USER_RECEIVED': {
      const { user } = action
      return state.set(user.id, camelizeKeys(user))
    }
    case 'USER_DELETED': {
      return state.without(action.userId)
    }
    case 'ALL_USERS_POEMS_LOADED': {
      const { userId } = action
      return state.setIn([userId, 'allPoemsLoaded'], true)
    }
    default:
      return state
  }
}

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

export const _getCurrentUser = () => (
  (dispatch) => {
    request
      .get(`${baseUrl}/users/current`)
      .end((err, res) => {
        if (err) { return }
        recieveCurrentUser(dispatch, res.body)
      })
  }
)

export const _getUser = userId => (
  (dispatch) => {
    request
      .get(`${baseUrl}/users/${userId}`)
      .end((err, res) => {
        if (err) { return }
        recieveUser(dispatch, res.body)
      })
  }
)

export const _logInUser = user => (
  (dispatch) => {
    request
      .post(`${baseUrl}/users/login`)
      .send({ user })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        recieveCurrentUser(dispatch, res.body)
      })
  }
)

export const _logoutUser = () => (
  (dispatch) => {
    request
      .delete(`${baseUrl}/users/logout`)
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        clearUser(dispatch, res.body)
      })
  }
)

export const _signUpUser = user => (
  (dispatch) => {
    request
      .post(`${baseUrl}/users/`)
      .send({ user })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        recieveCurrentUser(dispatch, res.body)
      })
  }
)
