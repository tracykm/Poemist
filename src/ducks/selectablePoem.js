import formatLetters from 'src/utils/formatLetters.js';

const initialState = {
  isSelectingByWord: true,
  passage: null,
};

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
    default:
      return state;
  }
};
