import React from 'react'
import 'src/components/poem/_poem.scss'
import Word from './Word'

const SelectablePoemRender = ({
  wordLetters,
  isSelectingByWord,
  handleClick,
}) => (
  <div className="poem">
    <div className="poem-body">
      <div className="background-img" />
      <div
        className={
          isSelectingByWord ? 'selecting-by-word' : 'selecting-by-letter'
        }
      >
        {wordLetters.map((word, i) => (
          <Word word={word} key={i} wordIdx={i} handleClick={handleClick} />
        ))}
      </div>
    </div>
  </div>
)

export default SelectablePoemRender
