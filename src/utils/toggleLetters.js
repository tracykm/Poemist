function toggleLetters({ wordLetters, wordIdx, letterIdx, isSelectingByWord }) {
  if (isSelectingByWord) {
    const isSelected = !wordLetters[wordIdx][letterIdx].isSelected // current letter's state
    // all letters in word should change together
    return wordLetters.update(wordIdx, word => word.map(letter => letter.set('isSelected', isSelected)))
  } else {
    return wordLetters.updateIn([wordIdx, letterIdx, 'isSelected'], isSelected => !isSelected)
  }
}

export default toggleLetters
