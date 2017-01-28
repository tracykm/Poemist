import formatLetters from 'src/utils/formatLetters.js';

const initialState = {
  isSelectingByWord: true,
  passage: null,
};

function toggleLetters(state, { wordIdx, letterIdx }) {
  const newWordLetters = state.wordLetters;
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
    case 'PASSAGE_RECEIVED':
      return {
        ...state,
        wordLetters: formatLetters({ passage: action.passage.text }),
        title: action.passage.title,
      };
    case 'TOGGLE_SELECT_BY':
      return { ...state, isSelectingByWord: !state.isSelectingByWord };
    case 'MAKE_CURRENT_POEM_SELECTABLE':
      return {
        ...state,
        wordLetters: formatLetters({ passage: action.currentPoem.passage, selectedTexts: action.currentPoem.selectedTexts }),
      };
    case 'TOGGLE_SELECTED_LETTERS':
      return toggleLetters(state, action.letters);
    default:
      return state;
  }
};
