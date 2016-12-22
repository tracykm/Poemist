import React from 'react';
import { Link } from 'react-router';

import './_poem.scss';

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
    <Link to={{ pathname: `/poem/${poem.id}` }}>poem link</Link>
    <div className="poem-header">x</div>
    { poem.text && poem.text.map((textSpan, i) => (<TextSpan key={i} {...textSpan} />)) }
    <div className="poem-footer">-{poem.author}</div>
  </div>
);

Poem.propTypes = {
  poem: React.PropTypes.object,
};

export default Poem;
