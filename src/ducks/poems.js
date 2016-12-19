module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'POEM_RECEIVED':
      return { ...state, [action.poem.id]: action.poem };
    default:
      return state;
  }
};
