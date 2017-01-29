import { random } from 'lodash';
import { formatPoem } from 'src/utils/formatPoem.js';
import getSelectedTexts from 'src/utils/getSelectedTexts.js';

module.exports = (currentPoem = null, action) => {
  switch (action.type) {
    case 'POEM_RECEIVED': {
      return formatPoem(action.poem);
    }
    case 'UPDATE_STYLE': {
      return {
        ...currentPoem,
        backgroundId: action.backgroundId,
      };
    }
    case 'UPDATE_COLOR': {
      return {
        ...currentPoem,
        colorRange: action.colorRange,
      };
    }
    case 'MAKE_POEM_UNSELECTABLE': {
      const poem = {
        selectedTexts: getSelectedTexts(action.selectablePoem.wordLetters),
        passage: action.selectablePoem.passage,
        backgroundId: random(10),
        colorRange: random(36),
        bookId: action.selectablePoem.bookId,
      };
      return formatPoem(poem);
    }
    default:
      return currentPoem;
  }
};
