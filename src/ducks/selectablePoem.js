import formatLetters from 'src/utils/formatLetters.js';
import toggleLetters from 'src/utils/toggleLetters.js';
import { from } from 'seamless-immutable';

const initialState = from({
  isSelectingByWord: true,
  passage: null,
  wordLetters: [],
});

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case 'PASSAGE_RECEIVED': {
      const { title, id, text } = action.passage;
      const attrs = {
        wordLetters: formatLetters({ passage: text }),
        passage: text,
        bookId: id,
        title,
      };
      return state.merge(attrs);
    }
    case 'TOGGLE_SELECT_BY':
      return state.set('isSelectingByWord', !state.isSelectingByWord);
    case 'MAKE_POEM_SELECTABLE': {
      const { passage, selectedTexts, bookId } = action.poem;
      const attrs = {
        passage,
        bookId,
        wordLetters: formatLetters({ passage, selectedTexts }),
      };
      return state.merge(attrs);
    }
    case 'TOGGLE_SELECTED_LETTERS': {
      const { wordIdx, letterIdx } = action.letters;
      const { wordLetters, isSelectingByWord } = state;
      const newWordLetters = toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord });
      return state.set('wordLetters', newWordLetters);
    }
    default:
      return state;
  }
};
