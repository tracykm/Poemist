import { camelizeKeys } from 'humps'
import { from } from 'seamless-immutable'
import request from 'src/ducks/superagent'

const baseUrl = 'http://localhost:3000/api'

const CURRENT_USER_RECEIVED = 'CURRENT_USER_RECEIVED'
const USER_RECEIVED = 'USER_RECEIVED'
const USER_DELETED = 'USER_DELETED'
const LOG_IN_ERROR_RECEIVED = 'LOG_IN_ERROR_RECEIVED'
const ALL_USERS_POEMS_LOADED = 'ALL_USERS_POEMS_LOADED'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

/* ----------- ACTIONS ----------- */

function recieveCurrentUser(user) {
  if (user.username) {
    return (dispatch) => {
      dispatch({
        type: CURRENT_USER_RECEIVED,
        payload: user.id,
      })
      return dispatch({
        type: USER_RECEIVED,
        payload: user,
      })
    }
  } else {
    return {
      type: LOG_IN_ERROR_RECEIVED,
      payload: user,
    }
  }
}

const recieveUser = user => ({
  type: USER_RECEIVED,
  payload: user,
})

const clearUser = () => ({
  type: USER_LOGGED_OUT,
})

export const handleFetchCurrentUser = () => (
  dispatch => (
    request
      .get(`${baseUrl}/users/current`)
      .then((res) => {
        return dispatch(recieveCurrentUser(res.body))
      })
  )
)

export const handleFetchUser = userId => (
  dispatch => (
    request
      .get(`${baseUrl}/users/${userId}`)
      .then((res, err) => {
        if (err) { return }
        return dispatch(recieveUser(res.body))
      })
  )
)

export const handleLogInUser = user => (
  dispatch => (
    request
      .post(`${baseUrl}/users/login`)
      .send({ user })
      .setCsrfToken()
      .then((res, err) => {
        if (err) { return }
        return dispatch(recieveCurrentUser(res.body))
      })
  )
)

export const handleLogoutUser = () => (
  dispatch => (
    request
      .delete(`${baseUrl}/users/logout`)
      .setCsrfToken()
      .then((res, err) => {
        if (err) { return }
        return dispatch(clearUser(res.body))
      })
  )
)

export const handleSignUpUser = user => (
  dispatch => (
    request
      .post(`${baseUrl}/users/`)
      .send({ user })
      .setCsrfToken()
      .then((res, err) => {
        if (err) { return }
        return dispatch(recieveCurrentUser(res.body))
      })
  )
)

export const getCurrentUser = state => {
  const userId = state.current.userId
  return state.users[userId]
}

export const getUser = (state, id) => state.users[id]


/* ----------- REDUCER ----------- */

const initialState = {
  entries: {},
  currentUserId: undefined,
}

export default (state = from({}), { type, payload }) => {
  switch (type) {
    case USER_RECEIVED: {
      return state.set(payload.id, camelizeKeys(payload))
    }
    case USER_DELETED: {
      return state.without(payload.userId)
    }
    case ALL_USERS_POEMS_LOADED: {
      return state.setIn([payload, 'allPoemsLoaded'], true)
    }
    default:
      return state
  }
}
