import { camelizeKeys } from 'humps';
import { from } from 'seamless-immutable';

export default (state = from({}), action) => {
  switch (action.type) {
    case 'USER_RECEIVED': {
      const { user } = action;
      return state.set(user.id, camelizeKeys(user));
    }
    case 'USER_DELETED': {
      return state.without(action.userId);
    }
    case 'ALL_USERS_POEMS_LOADED': {
      const { userId } = action;
      return state.setIn([userId, 'allPoemsLoaded'], true);
    }
    default:
      return state;
  }
};
