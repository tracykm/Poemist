import { cloneDeep } from 'lodash';

function toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord }) {
  const newWordLetters = cloneDeep(wordLetters); // TODO make less horribly inefficient
  if (isSelectingByWord) {
    const isSelected = !newWordLetters[wordIdx][letterIdx].isSelected; // current letter's state
    // all letters in word should change together
    newWordLetters[wordIdx] = newWordLetters[wordIdx].map(letter => ({ ...letter, isSelected }));
  } else {
    newWordLetters[wordIdx][letterIdx].isSelected = !newWordLetters[wordIdx][letterIdx].isSelected;
  }
  return newWordLetters;
}

export default toggleLetters;
