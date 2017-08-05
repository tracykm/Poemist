import { camelizeKeys } from 'humps'
import { from } from 'seamless-immutable'
import request, { baseUrl } from 'src/utils/superagent'
import { createSelector } from 'reselect'
import { RECIEVE_DATA, nestByKey } from './shared'

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
      payload: { message: user },
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
      .setCsrfToken()
      .then((res) => {
        return dispatch(recieveCurrentUser(res.body))
      })
  )
)

export const handleFetchUser = userId => (
  dispatch => (
    request
      .get(`${baseUrl}/users/${userId}`)
      .setCsrfToken()
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

/* ----------- SELECTORS ----------- */

export const getUsers = state => state.users.entries

export const getCurrentUserId = state => state.users.currentUserId

export const getCurrentUser = createSelector(
  getUsers,
  getCurrentUserId,
  (users, id) => users[id],
)

export const getUser = createSelector(
  getUsers,
  (_, id) => id,
  (users, { userId }) => users[userId],
)

/* ----------- REDUCER ----------- */

const initialState = from({
  entries: {},
  currentUserId: null,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RECIEVE_DATA: {
      return state.update('entries', entries => entries.merge(nestByKey(payload.users)))
    }
    case USER_RECEIVED: {
      return state.setIn(['entries', payload.id], camelizeKeys(payload))
    }
    case USER_DELETED: {
      return state.without(payload.userId)
    }
    case ALL_USERS_POEMS_LOADED: {
      return state.setIn(['entries', payload, 'allPoemsLoaded'], true)
    }
    case CURRENT_USER_RECEIVED: {
      return state.set('currentUserId', payload)
    }
    case USER_LOGGED_OUT:
      return state.set('currentUserId', null)
    default:
      return state
  }
}
