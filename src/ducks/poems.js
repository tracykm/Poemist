
module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'POEMS_RECEIVED': {
      const newPoems = {};
      action.poems.forEach((poem) => {
        newPoems[poem.id] = poem;
      });
      return { ...state, ...newPoems };
    }
    case 'POEM_RECEIVED': {
      const newPoems = {};
      newPoems[action.poem.id] = action.poem;
      return { ...state, ...newPoems };
    }
    case 'POEM_DELETED': {
      const removedPoem = {};
      removedPoem[action.poemId] = null;
      return { ...state, ...removedPoem };
    }
    default:
      return state;
  }
};
