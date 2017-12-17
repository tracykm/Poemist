import { from } from 'seamless-immutable'
import _ from 'lodash'

function splitWords(passage) {
  // takes 'but--I have' => ['but-', '-', 'I ', 'have' ]
  const words = []
  let word = ''

  passage.split('').forEach(ch => {
    word += ch
    if (ch === ' ' || ch === '-') {
      words.push(word)
      word = ''
    }
  })
  words.push(word) // last few letters with no space after
  return words
}

function formatLetters({ textChunks, passage }) {
  if (passage) {
    textChunks = [{ text: passage, isSelected: false }]
  } else if (!textChunks) {
    return null
  }
  let wordLetters = []
  let lastSelected
  textChunks.forEach(textChunk => {
    const wordArr = splitWords(textChunk.text)
    const letters = wordArr.map(word => {
      return _.map(word, ch => ({ ch, isSelected: textChunk.isSelected }))
    })
    if (lastSelected === textChunk.isSelected) {
      wordLetters = wordLetters[wordLetters.length - 1].concat(letters)
    } else {
      wordLetters = wordLetters.concat(letters)
    }

    lastSelected = textChunk.isSelected
  })
  return from(wordLetters)
}

export default formatLetters
