import { camelizeKeys } from 'humps'
import { from } from 'seamless-immutable'
import request from 'src/ducks/superagent'

const baseUrl = 'http://localhost:3000/api'

const CURRENT_USER_RECEIVED = 'CURRENT_USER_RECEIVED'
const USER_RECEIVED = 'USER_RECEIVED'
const LOG_IN_ERROR_RECEIVED = 'LOG_IN_ERROR_RECEIVED'

/* ----------- ACTIONS ----------- */

function recieveCurrentUser(returnedUser) {
  if (returnedUser.username) {
    return (dispatch) => {
      dispatch({
        type: CURRENT_USER_RECEIVED,
        userId: returnedUser.id,
      })
      dispatch({
        type: USER_RECEIVED,
        user: returnedUser,
      })
    }
  } else {
    return {
      type: LOG_IN_ERROR_RECEIVED,
      error: returnedUser,
    }
  }
}

const recieveUser = returnedUser => ({
  type: USER_RECEIVED,
  user: returnedUser,
})

const clearUser = () => ({
  type: 'USER_LOGGED_OUT',
})

export const handleFetchCurrentUser = () => (
  (dispatch) => {
    request
      .get(`${baseUrl}/users/current`)
      .end((err, res) => {
        if (err) { return }
        recieveCurrentUser(dispatch, res.body)
      })
  }
)

export const handleFetchUser = userId => (
  (dispatch) => {
    request
      .get(`${baseUrl}/users/${userId}`)
      .end((err, res) => {
        if (err) { return }
        dispatch(recieveUser(res.body))
      })
  }
)

export const handleLogInUser = user => (
  (dispatch) => {
    request
      .post(`${baseUrl}/users/login`)
      .send({ user })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        dispatch(recieveCurrentUser(res.body))
      })
  }
)

export const handleLogoutUser = () => (
  (dispatch) => {
    request
      .delete(`${baseUrl}/users/logout`)
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        dispatch(clearUser(res.body))
      })
  }
)

export const handleSignUpUser = user => (
  (dispatch) => {
    request
      .post(`${baseUrl}/users/`)
      .send({ user })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        dispatch(recieveCurrentUser(res.body))
      })
  }
)


/* ----------- REDUCER ----------- */

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
