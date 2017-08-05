import { from } from 'seamless-immutable'
import _ from 'lodash'
import formatLetters from 'src/utils/formatLetters.js'
import toggleLetters from 'src/utils/toggleLetters.js'
import getSelectedTexts from 'src/utils/getSelectedTexts.js'
import { formatPoem } from 'src/utils/formatPoem.js'
import request, { baseUrl } from 'src/utils/superagent'

const MAKE_CURRENT_POEM_SELECTABLE = 'MAKE_CURRENT_POEM_SELECTABLE'
const MAKE_POEM_UNSELECTABLE = 'MAKE_POEM_UNSELECTABLE'
const MAKE_POEM_SELECTABLE = 'MAKE_POEM_SELECTABLE'
const TOGGLE_SELECTED_LETTERS = 'TOGGLE_SELECTED_LETTERS'
const TOGGLE_SELECT_BY = 'TOGGLE_SELECT_BY'
const CLEAR_POEM = 'CLEAR_POEM'
const REMOVE_ALL_SELECTS = 'REMOVE_ALL_SELECTS'
const PASSAGE_RECEIVED = 'PASSAGE_RECEIVED'
const UPDATE_STYLE = 'UPDATE_STYLE'


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

export const updateStyle = styleObj => ({
  type: UPDATE_STYLE,
  payload: styleObj,
})

export const makePoemUnselectable = selectablePoem => ({
  type: MAKE_POEM_UNSELECTABLE,
  payload: selectablePoem,
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

export const getSelectablePoem = state => state.selectablePoem.poem


/* ----------- REDUCER ----------- */
const initialState = from({
  isSelectingByWord: true,
  isWriting: true,
  isBlank: true,
  poem: {
    passage: null,
    wordLetters: [],
  },
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CLEAR_POEM:
      return initialState
    case PASSAGE_RECEIVED: {
      const { title, id, text } = payload
      const poem = {
        wordLetters: formatLetters({ passage: text }),
        passage: text,
        bookId: id,
        title,
      }
      return state.set('poem', poem).set('isBlank', true)
    }
    case REMOVE_ALL_SELECTS: {
      const wordLetters = formatLetters({ passage: state.poem.passage })
      return state.setIn(['poem', 'wordLetters'], wordLetters)
    }
    case TOGGLE_SELECT_BY:
      return state.set('isSelectingByWord', !state.isSelectingByWord)
    case MAKE_POEM_SELECTABLE: {
      const wordLetters = formatLetters({ textChunks: state.poem.textChunks })
      return state.setIn(['poem', 'wordLetters'], wordLetters).set('isBlank', false)
    }
    case TOGGLE_SELECTED_LETTERS: {
      const { wordIdx, letterIdx } = payload
      const { wordLetters } = state.poem
      const { isSelectingByWord } = state
      const newWordLetters = toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord })
      return state.setIn(['poem', 'wordLetters'], newWordLetters).set('isBlank', false)
    }
    case MAKE_POEM_UNSELECTABLE: {
      const attrs = {
        backgroundId: _.random(10),
        colorRange: _.random(36),
        textChunks: getSelectedTexts(state.poem.wordLetters),
      }
      return state.update('poem', poem => poem.merge(attrs))
    }
    case UPDATE_STYLE: {
      return state.update('poem', poem => poem.merge(payload))
    }
    default:
      return state
  }
}
