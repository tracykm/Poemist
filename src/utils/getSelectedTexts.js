import { from } from 'seamless-immutable'
import { flatten } from 'lodash'

function getSelectedTexts(wordLetters) {
  const letters = flatten(wordLetters)
  let currentlySelected = false
  const allText = []
  let text = ''

  letters.forEach((letter) => {
    // only push index when switching
    if (letter.isSelected !== currentlySelected) {
      if (text) allText.push({ text, isSelected: currentlySelected })
      text = letter.ch
      currentlySelected = !currentlySelected
    } else {
      text += letter.ch
    }
  })

  // if selected at end, close it
  if (text) allText.push({ text, isSelected: currentlySelected })
  return from(allText)
}

export default getSelectedTexts
