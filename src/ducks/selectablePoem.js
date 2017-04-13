import formatLetters from 'src/utils/formatLetters.js'
import toggleLetters from 'src/utils/toggleLetters.js'
import { from } from 'seamless-immutable'
import { _getNewPassage, _getPoemAndMakeSelectable } from 'src/actions/ajax/poem'

const initialState = from({
  isSelectingByWord: true,
  passage: null,
  isBlank: true,
  wordLetters: [],
})

module.exports = (state = initialState, action) => {
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
      const { passage, selectedTexts, bookId } = action.poem
      const attrs = {
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
