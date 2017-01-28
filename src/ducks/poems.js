import { formatPoems } from 'src/utils/formatPoem.js';

module.exports = (state = { listedPoems: [] }, action) => {
  switch (action.type) {
    case 'POEMS_RECEIVED':
      return { ...state, listedPoems: formatPoems(action.poems) };
    default:
      return state;
  }
};
