import { from } from 'seamless-immutable'

const initialState = from({
  showLogin: false,
  errors: null,
  onSignUp: true,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_ERROR_RECEIVED':
      return state.set('errors', action.error) // ex ["Invalid username or password."]
    case 'LOG_IN_TOGGLED':
      return state.set('showLogin', !state.showLogin)
    case 'CURRENT_USER_RECEIVED':
      return initialState
    case 'USER_LOGGED_OUT':
      return initialState
    case 'SHOW_ON_SIGN_UP':
      return from({
        showLogin: true,
        onSignUp: true,
        errors: action.errors,
      })
    case 'SHOW_ON_LOG_IN':
      return from({
        showLogin: true,
        onSignUp: false,
        errors: action.errors,
      })
    default:
      return state
  }
}

export const _toggleShowLogin = () => (
  {
    type: 'LOG_IN_TOGGLED',
  }
)
export const _showOnSignUp = errors => (
  {
    type: 'SHOW_ON_SIGN_UP',
    errors: (typeof errors === 'string' ? errors : null),
    // hack for dispach getting passed when nothing else
  }
)
export const _showOnLogin = errors => (
  {
    type: 'SHOW_ON_LOG_IN',
    errors: (typeof errors === 'string' ? errors : null),
  }
)
