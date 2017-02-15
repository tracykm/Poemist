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
    case 'ALL_USERS_POEMS_LOADED': {
      const { userId } = action;
      const user = state[userId];
      user.allPoemsLoaded = true;
      return { ...state, [userId]: user };
    }
    default:
      return state;
  }
};
