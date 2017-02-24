import { from } from 'seamless-immutable';

const initialState = from({
  showLogin: false,
  errors: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR_RECEIVED':
      return state.set('errors', action.error); // ex ["Invalid username or password."]
    case 'LOGIN_TOGGLED':
      return state.set('showLogin', !state.showLogin);
    case 'CURRENT_USER_RECEIVED':
      return state.set('errors', null);
    case 'USER_LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
};
