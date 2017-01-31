export default (current = {}, action) => {
  switch (action.type) {
    case 'CURRENT_USER_RECEIVED': {
      return { ...current, userId: action.userId };
    }
    case 'USER_LOGGED_OUT':
      return { ...current, userId: null };
    case 'CURRENT_POEM_VIEWED': {
      return { ...current, poemId: action.poemId }; // TODO: make poemId a number not string
    }
    default:
      return current;
  }
};
