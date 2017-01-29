import { random } from 'lodash';
import getSelectedTexts from 'src/utils/getSelectedTexts.js';
import makePassageChunks from 'src/utils/makePassageChunks.js';

module.exports = (stylingPoem = null, action) => {
  switch (action.type) {
    case 'UPDATE_STYLE': {
      return {
        ...stylingPoem,
        backgroundId: action.backgroundId,
      };
    }
    case 'UPDATE_COLOR': {
      return {
        ...stylingPoem,
        colorRange: action.colorRange,
      };
    }
    case 'MAKE_POEM_UNSELECTABLE': {
      const { wordLetters, passage, bookId } = action.selectablePoem;
      const selectedTexts = getSelectedTexts(wordLetters);
      return {
        selectedTexts,
        passage,
        bookId,
        backgroundId: random(10),
        colorRange: random(36),
        text: makePassageChunks({ passage, selectedTexts }),
      };
    }
    default:
      return stylingPoem;
  }
};
