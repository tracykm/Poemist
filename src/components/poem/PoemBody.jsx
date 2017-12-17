import React from 'react'
import './_poemBody.scss'

const TextSpan = ({ isSelected, text }) => (
  <span className={isSelected ? 'is-selected' : 'not-selected'}>{text}</span>
)

TextSpan.propTypes = {
  isSelected: React.PropTypes.bool,
  text: React.PropTypes.string,
}

const PoemBody = ({ textChunks }) => (
  <div className="poem-body">
    {textChunks &&
      textChunks.map((textSpan, i) => <TextSpan key={i} {...textSpan} />)}
  </div>
)

PoemBody.propTypes = {
  textChunks: React.PropTypes.array,
}

export default PoemBody
