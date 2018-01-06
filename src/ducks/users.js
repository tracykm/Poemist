import { from } from 'seamless-immutable'
import request, { scope, baseUrl } from 'src/utils/superagent'
import { createSelector } from 'reselect'
import { RECIEVE_DATA, nestByKey } from './shared'

const CURRENT_USER_RECEIVED = 'CURRENT_USER_RECEIVED'
const USER_RECEIVED = 'USER_RECEIVED'
const USER_DELETED = 'USER_DELETED'
const LOG_IN_ERROR_RECEIVED = 'LOG_IN_ERROR_RECEIVED'
const ALL_USERS_POEMS_LOADED = 'ALL_USERS_POEMS_LOADED'
const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

/* ----------- ACTIONS ----------- */
const recieveLoginError = error => ({
  type: LOG_IN_ERROR_RECEIVED,
  payload: error,
})

function recieveCurrentUser(user) {
  if (user.username) {
    localStorage.setItem('session', user.sessionToken)
    return dispatch => {
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
    return recieveLoginError(user)
  }
}

const recieveUser = user => ({
  type: USER_RECEIVED,
  payload: user,
})

const clearUser = () => ({
  type: USER_LOGGED_OUT,
})

export const handleFetchCurrentUser = () => dispatch =>
  scope()
    .send({
      query: `
        {
          current {
            id
            username
            sessionToken
            poems {
              id
            }
          }
        }
      `,
    })
    .then(res => {
      const user = res.body.current
      if (user) return dispatch(recieveCurrentUser(user))
    })

export const handleFetchUser = userId => dispatch =>
  scope()
    .send({
      query: `
        {
          user(id: ${userId}) {
            id
            username
            sessionToken
            poemsWrittenCount
          }
        }
      `,
    })
    .then(({ body }) => {
      if (body.errors) {
        return dispatch(recieveLoginError(body.errors[0]))
      }
      return dispatch(recieveUser(body.user))
    })

export const handleLogInUser = ({ username, password }) => dispatch =>
  scope()
    .send({
      query: `
        mutation {
          loginUser(username: "${username}", password: "${password}") {
            id
            username
            sessionToken
          }
        }
      `,
    })
    .then(({ body }) => {
      if (body.errors) {
        return dispatch(recieveLoginError(body.errors[0]))
      }
      return dispatch(recieveCurrentUser(body.loginUser))
    })

export const handleLogoutUser = () => dispatch =>
  scope()
    .send({
      query: `
        mutation {
          logoutUser() {
            id
            username
          }
        }
      `,
    })
    .then((res, err) => {
      if (err) {
        return
      }
      return dispatch(clearUser(res.body.logoutUser))
    })

export const handleSignUpUser = ({ username, password }) => dispatch =>
  scope()
    .send({
      query: `
        mutation {
          createUser(username: "${username}", password: "${password}") {
            id
            username
            sessionToken
          }
        }
      `,
    })
    .then(({ body }) => {
      if (body.errors) {
        return dispatch(recieveLoginError(body.errors[0]))
      }
      return dispatch(recieveCurrentUser(body.createUser))
    })

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
      return state.update('entries', entries =>
        entries.merge(nestByKey(payload.users)),
      )
    }
    case USER_RECEIVED: {
      return state.setIn(['entries', payload.id], payload)
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
