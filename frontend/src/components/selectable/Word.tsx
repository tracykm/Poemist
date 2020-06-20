import * as React from "react"
import { IWordLetter } from "../types"

export type IHandleClickLetter = ({
  wordIdx,
  letterIdx,
}: {
  wordIdx: number
  letterIdx: number
}) => void

interface IPropsLetter extends IWordLetter {
  letterIdx: number
  handleClickLetter: () => void
}

const Letter = ({
  isSelected,
  ch,
  letterIdx,
  handleClickLetter,
}: IPropsLetter) => (
  <span
    className={`letter ${isSelected ? "is" : "not"}-selected`}
    data-idx={letterIdx}
    onClick={handleClickLetter}
  >
    {ch}
  </span>
)

interface IPropsWord {
  word: IWordLetter[]
  wordIdx: number
  handleClickLetter: IHandleClickLetter
}

const Word = ({ word, wordIdx, handleClickLetter }: IPropsWord) => (
  <span className="word" data-word-idx={wordIdx}>
    {word.map(({ ch, isSelected }, letterIdx) => {
      return (
        <Letter
          key={`${wordIdx}${letterIdx}`}
          {...{ ch, isSelected, letterIdx }}
          handleClickLetter={() => handleClickLetter({ wordIdx, letterIdx })}
        />
      )
    })}
  </span>
)

export default Word
