import { from } from 'seamless-immutable'

const LOG_IN_TOGGLED = 'LOG_IN_TOGGLED'
const LOG_IN_ERROR_RECEIVED = 'LOG_IN_ERROR_RECEIVED'
const SHOW_SIGN_UP = 'SHOW_SIGN_UP'
const SHOW_LOG_IN = 'SHOW_LOG_IN'

/* ----------- ACTIONS ----------- */
export const toggleShowLogin = () => ({
  type: LOG_IN_TOGGLED,
})

export const showSignUp = message => ({ // poxy object is passed in making message=null impossible
  type: SHOW_SIGN_UP,
  payload: { message: typeof message === 'string' && message },
})

export const showLogin = (message = '') => ({
  type: SHOW_LOG_IN,
  payload: { message: typeof message === 'string' && message },
})

/* ----------- SELECTORS ----------- */
export const getShowLogin = state => state.login.showLogin
export const getIsSignUpSelected = state => state.login.signUpSelected
export const getLoginMessage = state => state.login.message


/* ----------- REDUCER ----------- */
const initialState = from({
  showLogin: false,
  signUpSelected: true,
  message: '',
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN_ERROR_RECEIVED:
      return state.set('message', payload.message) // ex ["Invalid username or password."]
    case LOG_IN_TOGGLED:
      return state.set('showLogin', !state.showLogin)
    case 'CURRENT_USER_RECEIVED':
      return initialState
    case 'USER_LOGGED_OUT':
      return initialState
    case SHOW_SIGN_UP:
      return from({
        showLogin: true,
        signUpSelected: true,
        message: payload.message,
      })
    case SHOW_LOG_IN:
      return from({
        showLogin: true,
        signUpSelected: false,
        message: payload.message,
      })
    default:
      return state
  }
}
