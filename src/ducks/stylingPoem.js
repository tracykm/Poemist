import { random } from 'lodash'
import getSelectedTexts from 'src/utils/getSelectedTexts.js'
import makePassageChunks from 'src/utils/makePassageChunks.js'
import { from } from 'seamless-immutable'

const initialState = from({
  backgroundId: 0,
  colorRange: 0,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STYLE': {
      return state.merge(action.styleObj) // TODO: more thought to whether this is dangerous
    }
    case 'UPDATE_COLOR': {
      return state.set('colorRange', action.colorRange)
    }
    case 'MAKE_POEM_UNSELECTABLE': {
      const { wordLetters, passage, bookId } = action.selectablePoem
      const selectedTexts = getSelectedTexts(wordLetters)
      return from({
        selectedTexts,
        passage,
        bookId,
        backgroundId: random(10),
        colorRange: random(36),
        text: makePassageChunks({ passage, selectedTexts }),
      })
    }
    default:
      return state
  }
}
