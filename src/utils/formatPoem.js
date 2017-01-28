import { camelizeKeys } from 'humps';
import { makePassageChunks } from '../utils/selectedText';

export function formatPoem(poem) {
  const newPoem = camelizeKeys(poem);
  const { passage, selectedTexts } = newPoem;
  newPoem.text = makePassageChunks({ passage, selectedTexts });
  return newPoem;
}

export function formatPoems(poems) {
  return poems.map(poem => formatPoem(poem));
}
