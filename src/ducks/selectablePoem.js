import formatLetters from 'src/utils/formatLetters.js';
import toggleLetters from 'src/utils/toggleLetters.js';

const initialState = {
  isSelectingByWord: true,
  passage: null,
  wordLetters: [],
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'PASSAGE_RECEIVED': {
      const { title, id, text } = action.passage;
      return {
        ...state,
        wordLetters: formatLetters({ passage: text }),
        passage: text,
        bookId: id,
        title,
      };
    }
    case 'TOGGLE_SELECT_BY':
      return { ...state, isSelectingByWord: !state.isSelectingByWord };
    case 'MAKE_POEM_SELECTABLE': {
      const { passage, selectedTexts } = action.poem;
      return {
        ...state,
        passage,
        wordLetters: formatLetters({ passage, selectedTexts }),
      };
    }
    case 'TOGGLE_SELECTED_LETTERS': {
      const { wordIdx, letterIdx } = action.letters;
      const { wordLetters, isSelectingByWord } = state;
      return { ...state, wordLetters: toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord }) };
    }
    default:
      return state;
  }
};
