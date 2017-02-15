export default (state = {}, action) => {
  switch (action.type) {
    case 'CURRENT_USER_RECEIVED': {
      return { ...state, userId: action.userId };
    }
    case 'USER_LOGGED_OUT':
      return { ...state, userId: null };
    case 'CURRENT_POEM_VIEWED': {
      return { ...state, poemId: action.poemId }; // TODO: make poemId a number not string
    }
    case 'ALL_POEMS_LOADED': {
      return { ...state, allPoemsLoaded: true };
    }
    default:
      return state;
  }
};
