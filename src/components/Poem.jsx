import React from 'react';
import './poem.scss';

const TextSpan = ({ isSelected, text }) => (
  <span
    className={isSelected ? 'is-selected' : 'not-selected'}
  >
    {text}
  </span>
);

TextSpan.propTypes = {
  isSelected: React.PropTypes.bool,
  text: React.PropTypes.string,
};

const Poem = ({ poem }) => (
  <div className="poem">
    <div className="poem-header">x</div>
    { poem.text && poem.text.map((textSpan, i) => (<TextSpan key={i} {...textSpan} />)) }
    <div className="poem-footer">-{poem.author}</div>
  </div>
);

Poem.propTypes = {
  poem: React.PropTypes.object,
};

export default Poem;
