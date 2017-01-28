import { formatPoem } from 'src/utils/formatPoem.js';
import getSelectedTexts from 'src/utils/getSelectedTexts.js';

module.exports = (currentPoem = null, action) => {
  switch (action.type) {
    case 'POEM_RECEIVED': {
      return formatPoem(action.poem);
    }
    case 'MAKE_POEM_UNSELECTABLE': {
      const poem = {
        selectedTexts: getSelectedTexts(action.selectablePoem.wordLetters),
        passage: action.selectablePoem.passage,
      };
      return formatPoem(poem);
    }
    default:
      return currentPoem;
  }
};
