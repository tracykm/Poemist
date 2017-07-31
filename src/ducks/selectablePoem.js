import { from } from 'seamless-immutable'
import formatLetters from 'src/utils/formatLetters.js'
import toggleLetters from 'src/utils/toggleLetters.js'
import { formatPoem } from 'src/utils/formatPoem.js'
import request from 'src/ducks/superagent'

const baseUrl = 'http://localhost:3000/api'

const MAKE_CURRENT_POEM_SELECTABLE = 'MAKE_CURRENT_POEM_SELECTABLE'
const MAKE_POEM_SELECTABLE = 'MAKE_POEM_SELECTABLE'
const TOGGLE_SELECTED_LETTERS = 'TOGGLE_SELECTED_LETTERS'
const TOGGLE_SELECT_BY = 'TOGGLE_SELECT_BY'
const CLEAR_POEM = 'CLEAR_POEM'
const REMOVE_ALL_SELECTS = 'REMOVE_ALL_SELECTS'
const PASSAGE_RECEIVED = 'PASSAGE_RECEIVED'


/* ----------- ACTIONS ----------- */
export const makeCurrentPoemSelectable = poemId => ({
  type: MAKE_CURRENT_POEM_SELECTABLE,
  payload: poemId,
})

export const recievePoemMakeSelectable = poem => ({
  type: MAKE_POEM_SELECTABLE,
  payload: formatPoem(poem),
})

export const toggleSelectedLetters = letters => ({
  type: TOGGLE_SELECTED_LETTERS,
  payload: letters,
})

export const toggleSelectBy = () => ({
  type: TOGGLE_SELECT_BY,
})

export const clearPoem = styleObj => ({
  type: CLEAR_POEM,
  payload: styleObj,
})

export const clearSelects = () => ({
  type: REMOVE_ALL_SELECTS,
})

export const recievePassage = passage => ({
  type: PASSAGE_RECEIVED,
  payload: passage,
})

export const handleFetchNewPassage = () => (
  dispatch => (
    request
      .get(`${baseUrl}/books/new`)
      .then(res => (
        dispatch(recievePassage(res.body))
      ),
    )
  )
)

export const getPoemAndMakeSelectable = id => (
  dispatch => (
    request
      .get(`${baseUrl}/poems/${id}`)
      .then(res => (
        dispatch(recievePoemMakeSelectable(res.body))
      ))
  )
)

/* ----------- SELECTORS ----------- */

export const getSelectablePoem = state => state.selectablePoem

/* ----------- REDUCER ----------- */
const initialState = from({
  isSelectingByWord: true,
  passage: null,
  isBlank: true,
  wordLetters: [],
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_POEM:
      return initialState
    case PASSAGE_RECEIVED: {
      const { title, id, text } = payload
      const attrs = {
        wordLetters: formatLetters({ passage: text }),
        passage: text,
        bookId: id,
        title,
        isBlank: true,
      }
      return state.merge(attrs)
    }
    case REMOVE_ALL_SELECTS: {
      const attrs = {
        wordLetters: formatLetters({ passage: state.passage }),
        isBlank: true,
      }
      return state.merge(attrs)
    }
    case TOGGLE_SELECT_BY:
      return state.set('isSelectingByWord', !state.isSelectingByWord)
    case 'MAKE_POEM_SELECTABLE': {
      const { passage, selectedTexts, bookId, bookTitle } = payload
      const attrs = {
        bookTitle,
        passage,
        bookId,
        isBlank: false,
        wordLetters: formatLetters({ passage, selectedTexts }),
      }
      return state.merge(attrs)
    }
    case TOGGLE_SELECTED_LETTERS: {
      const { wordIdx, letterIdx } = payload
      const { wordLetters, isSelectingByWord } = state
      const newWordLetters = toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord })
      const attrs = {
        wordLetters: newWordLetters,
        isBlank: false,
      }
      return state.merge(attrs)
    }
    default:
      return state
  }
}
