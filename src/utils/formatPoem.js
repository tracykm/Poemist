import { camelizeKeys } from 'humps';
import { from } from 'seamless-immutable';
import makePassageChunks from '../utils/makePassageChunks';

export function formatPoem(poem) {
  const newPoem = camelizeKeys(poem);
  const { passage } = newPoem;
  const selectedTexts = from(newPoem.selectedTexts);
  newPoem.text = makePassageChunks({ passage, selectedTexts });
  return newPoem;
}

export function formatPoems(poems) {
  return poems.map(poem => formatPoem(poem));
}
