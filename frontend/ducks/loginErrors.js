module.exports = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_ERROR_RECEIVED':
      return action.error; // ex ["Invalid username or password."]
    case 'CURRENT_USER_RECEIVED':
      return ['Success'];
    default:
      return state;
  }
};
