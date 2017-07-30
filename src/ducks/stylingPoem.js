import { random } from 'lodash'
import getSelectedTexts from 'src/utils/getSelectedTexts.js'
import makePassageChunks from 'src/utils/makePassageChunks.js'
import { from } from 'seamless-immutable'

const initialState = from({
  backgroundId: 0,
  colorRange: 0,
})

export default (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
