import { camelizeKeys } from 'humps'
import { from } from 'seamless-immutable'
import _ from 'lodash'
import makePassageChunks from '../utils/makePassageChunks'

export function formatPoem(poem) {
  const newPoem = camelizeKeys(poem)
  const { passage } = newPoem
  const selectedTexts = from(newPoem.selectedTexts)
  newPoem.text = makePassageChunks({ passage, selectedTexts })
  return newPoem
}

export function formatPoems(poems) {
  return _.map(poems, (poem => formatPoem(poem)))
}
