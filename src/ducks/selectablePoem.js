import { from } from 'seamless-immutable'
import formatLetters from 'src/utils/formatLetters.js'
import toggleLetters from 'src/utils/toggleLetters.js'
// import { _getNewPassage, _getPoemAndMakeSelectable } from 'src/ducks/poems'

const initialState = from({
  isSelectingByWord: true,
  passage: null,
  isBlank: true,
  wordLetters: [],
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAR_POEM':
      return initialState
    case 'PASSAGE_RECEIVED': {
      const { title, id, text } = action.passage
      const attrs = {
        wordLetters: formatLetters({ passage: text }),
        passage: text,
        bookId: id,
        title,
        isBlank: true,
      }
      return state.merge(attrs)
    }
    case 'REMOVE_ALL_SELECTS': {
      const attrs = {
        wordLetters: formatLetters({ passage: state.passage }),
        isBlank: true,
      }
      return state.merge(attrs)
    }
    case 'TOGGLE_SELECT_BY':
      return state.set('isSelectingByWord', !state.isSelectingByWord)
    case 'MAKE_POEM_SELECTABLE': {
      const { passage, selectedTexts, bookId, bookTitle } = action.poem
      const attrs = {
        bookTitle,
        passage,
        bookId,
        isBlank: false,
        wordLetters: formatLetters({ passage, selectedTexts }),
      }
      return state.merge(attrs)
    }
    case 'TOGGLE_SELECTED_LETTERS': {
      const { wordIdx, letterIdx } = action.letters
      const { wordLetters, isSelectingByWord } = state
      const newWordLetters = toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord })
      const attrs = {
        wordLetters: newWordLetters,
        isBlank: false,
      }
      return state.merge(attrs)
    }
    // case '@@router/LOCATION_CHANGE': {
    //   const { pathname } = action.payload
    //   if (pathname === '/new/write' && !state.passage) {
    //     _getNewPassage()
    //   }
    //   // debugger
    // }
    default:
      return state
  }
}

export const _makeCurrentPoemSelectable = poemId => (
  {
    type: 'MAKE_CURRENT_POEM_SELECTABLE',
    poemId,
  }
)
export const _makePoemUnselectable = selectablePoem => (
  {
    type: 'MAKE_POEM_UNSELECTABLE',
    selectablePoem,
  }
)
export const _toggleSelectedLetters = letters => (
  {
    type: 'TOGGLE_SELECTED_LETTERS',
    letters,
  }
)
export const _toggleSelectBy = () => (
  {
    type: 'TOGGLE_SELECT_BY',
  }
)
export const _updateStyle = styleObj => (
  {
    type: 'UPDATE_STYLE',
    styleObj,
  }
)
export const _clearPoem = styleObj => (
  {
    type: 'CLEAR_POEM',
    styleObj,
  }
)
export const _clearSelects = () => (
  {
    type: 'REMOVE_ALL_SELECTS',
  }
)
