const initialState = {
  showLogin: false,
  errors: null,
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR_RECEIVED':
      return { ...state, errors: action.error }; // ex ["Invalid username or password."]
    case 'LOGIN_TOGGLED':
      return { ...state, showLogin: !state.showLogin };
    case 'CURRENT_USER_RECEIVED':
      return { errors: null };
    default:
      return state;
  }
};
