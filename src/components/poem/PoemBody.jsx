import PropTypes from 'prop-types';
import React from 'react'
import './_poemBody.scss'

const TextSpan = ({ isSelected, text }) => (
  <span className={isSelected ? 'is-selected' : 'not-selected'}>{text}</span>
)

TextSpan.propTypes = {
  isSelected: PropTypes.bool,
  text: PropTypes.string,
}

const PoemBody = ({ textChunks }) => (
  <div className="poem-body">
    {textChunks &&
      textChunks.map((textSpan, i) => <TextSpan key={i} {...textSpan} />)}
  </div>
)

PoemBody.propTypes = {
  textChunks: PropTypes.array,
}

export default PoemBody
