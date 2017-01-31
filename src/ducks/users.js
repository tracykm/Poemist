import { camelizeKeys } from 'humps';

module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'USER_RECEIVED': {
      const newUser = {};
      newUser[action.user.id] = camelizeKeys(action.user);
      return { ...state, ...newUser };
    }
    case 'USER_DELETED': {
      const removedUser = {};
      removedUser[action.userId] = null;
      return { ...state, ...removedUser };
    }
    default:
      return state;
  }
};
