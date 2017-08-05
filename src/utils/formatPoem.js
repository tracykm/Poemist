import { camelizeKeys } from 'humps'
import { from } from 'seamless-immutable'
import _ from 'lodash'

export function formatPoem(poem) {
  return camelizeKeys(poem)
}

export function formatPoems(poems) {
  return _.map(poems, (poem => formatPoem(poem)))
}
