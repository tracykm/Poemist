import { from } from 'seamless-immutable';

export default (state = from({}), action) => {
  switch (action.type) {
    case 'CURRENT_USER_RECEIVED': {
      return state.set('userId', action.userId);
    }
    case 'USER_LOGGED_OUT':
      return state.set('userId', null);
    case 'CURRENT_POEM_VIEWED': {
      return state.set('poemId', action.poemId); // TODO: make poemId a number not string
    }
    case 'ALL_POEMS_LOADED': {
      return state.set('allPoemsLoaded', true);
    }
    default:
      return state;
  }
};
