import { from } from 'seamless-immutable'

const LOG_IN_TOGGLED = 'LOG_IN_TOGGLED'
const LOG_IN_ERROR_RECEIVED = 'LOG_IN_ERROR_RECEIVED'
const SHOW_SIGN_UP = 'SHOW_SIGN_UP'
const SHOW_LOG_IN = 'SHOW_LOG_IN'

/* ----------- ACTIONS ----------- */
export const toggleShowLogin = () => (
  {
    type: LOG_IN_TOGGLED,
  }
)
export const showSignUp = (errors = null) => (
  {
    type: SHOW_SIGN_UP,
    payload: { errors },
  }
)
export const showLogin = (errors = null) => (
  {
    type: SHOW_LOG_IN,
    payload: { errors },
  }
)

/* ----------- SELECTORS ----------- */
export const getShowLogin = state => state.logIn.showLogin
export const getIsSignUpSelected = state => state.logIn.signUpSelected
export const getLoginMessage = state => state.logIn.errors


/* ----------- REDUCER ----------- */
const initialState = from({
  showLogin: false,
  errors: null,
  signUpSelected: true,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_ERROR_RECEIVED:
      return state.set('errors', action.error) // ex ["Invalid username or password."]
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
        errors: action.payload.errors,
      })
    case SHOW_LOG_IN:
      return from({
        showLogin: true,
        signUpSelected: false,
        errors: action.payload.errors,
      })
    default:
      return state
  }
}
