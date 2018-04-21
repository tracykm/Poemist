import React from 'react'
import './_poemBody.scss'

const TextSpan = ({ isSelected, text }) => (
  <span className={isSelected ? 'is-selected' : 'not-selected'}>{text}</span>
)

const PoemBody = ({ textChunks }) => (
  <div className="poem-body">
    {textChunks &&
      textChunks.map((textSpan, i) => <TextSpan key={i} {...textSpan} />)}
  </div>
)

export default PoemBody
