import { from } from "seamless-immutable"
import { flatten } from "lodash"
import { IWordLetter, ITextChunk } from "src/components/types"

function getSelectedTexts(wordLetters: IWordLetter[][]) {
  const letters = flatten(wordLetters)
  let currentlySelected = false
  const allText: ITextChunk[] = []
  let text = ""

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
