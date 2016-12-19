import { camelizeKeys } from 'humps';
import { makePassageChunks } from '../utils/selectedText';

function formatPoem(poem) {
  const newPoem = camelizeKeys(poem);
  const { passage, selectedTexts } = newPoem;
  newPoem.text = makePassageChunks({ passage, selectedTexts });
  return newPoem;
}

function formatPoems(poems) {
  return poems.map(poem => formatPoem(poem));
}

module.exports = (state = { currentPoem: null, listedPoems: [] }, action) => {
  switch (action.type) {
    case 'POEM_RECEIVED':
      return { ...state, currentPoem: formatPoem(action.poem) };
    case 'POEMS_RECEIVED':
      return { ...state, listedPoems: formatPoems(action.poems) };
    default:
      return state;
  }
};
