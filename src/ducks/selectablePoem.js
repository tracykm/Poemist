import formatLetters from 'src/utils/formatLetters.js';

const initialState = {
  isSelectingByWord: true,
  passage: null,
};

function toggleLetters(state, { wordIdx, letterIdx }) {
  const newWordLetters = state.wordLetters; // TODO make actually immutable, deep clone maybe
  if (state.isSelectingByWord) {
    const isSelected = !newWordLetters[wordIdx][letterIdx].isSelected; // current letter's state
    // all letters in word should change together
    newWordLetters[wordIdx] = newWordLetters[wordIdx].map(letter => ({ ...letter, isSelected }));
  } else {
    newWordLetters[wordIdx][letterIdx].isSelected = !newWordLetters[wordIdx][letterIdx].isSelected;
  }
  return { ...state, wordLetters: newWordLetters };
}

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
    case 'MAKE_CURRENT_POEM_SELECTABLE':
      return {
        ...state,
        passage: action.currentPoem.passage,
        wordLetters: formatLetters({ passage: action.currentPoem.passage, selectedTexts: action.currentPoem.selectedTexts }),
      };
    case 'TOGGLE_SELECTED_LETTERS':
      return toggleLetters(state, action.letters);
    default:
      return state;
  }
};
