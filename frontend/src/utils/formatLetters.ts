import { from } from "seamless-immutable"
import { map } from "lodash"
import { ITextChunk, IWordLetter } from "src/components/types"

function splitWords(passage: string) {
  // takes 'but--I have' => ['but-', '-', 'I ', 'have' ]
  const words: string[] = []
  let word = ""

  passage.split("").forEach((ch) => {
    word += ch
    if (ch === " " || ch === "-") {
      words.push(word)
      word = ""
    }
  })
  words.push(word) // last few letters with no space after
  return words
}

function formatLetters({
  textChunks,
  passage,
}: {
  textChunks: ITextChunk[]
  passage?: string
}) {
  if (passage) {
    textChunks = [{ text: passage, isSelected: false }]
  } else if (!textChunks) {
    return from([])
  }
  let wordLetters: IWordLetter[][] = []
  let lastSelected: boolean
  textChunks.forEach((textChunk) => {
    const wordArr = splitWords(textChunk.text)
    const letters = wordArr.map((word) => {
      return map(word, (ch) => ({ ch, isSelected: textChunk.isSelected }))
    })
    if (lastSelected === textChunk.isSelected) {
      //@ts-ignore
      wordLetters = wordLetters[wordLetters.length - 1].concat(letters)
    } else {
      wordLetters = wordLetters.concat(letters)
    }

    lastSelected = textChunk.isSelected
  })
  return from(wordLetters)
}

export default formatLetters
