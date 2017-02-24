import { from } from 'seamless-immutable';

export default (state = from({}), action) => {
  switch (action.type) {
    case 'POEMS_RECEIVED': {
      const newPoems = {};
      action.poems.forEach((poem) => {
        newPoems[poem.id] = poem;
      });
      return state.merge(newPoems);
    }
    case 'POEM_RECEIVED': {
      const { poem } = action;
      return state.set(poem.id, poem);
    }
    case 'POEM_DELETED': {
      return state.delete(action.poemId);
    }
    default:
      return state;
  }
};
