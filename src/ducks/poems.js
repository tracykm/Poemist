import { camelizeKeys } from 'humps';
import { makePassageChunks } from '../utils/selectedText';

function formatPoem(poem) {
  const { passage, selectedTexts } = camelizeKeys(poem);
  const newPoem = {};
  newPoem.text = makePassageChunks({ passage, selectedTexts });
  return newPoem;
}

module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'POEM_RECEIVED':
      return { ...state, [action.poem.id]: formatPoem(action.poem) };
    default:
      return state;
  }
};
