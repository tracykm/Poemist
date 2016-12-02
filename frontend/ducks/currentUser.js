module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_USER_RECEIVED':
      return action.user;
    default:
      return state;
  }
};
