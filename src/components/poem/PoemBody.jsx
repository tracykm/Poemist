import React from 'react';

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

const PoemBody = ({ text }) => (
  <div className="poem-body">
    {
      text.map((textSpan, i) => (
        <TextSpan key={i} {...textSpan} />
      ))
    }
  </div>
);

PoemBody.propTypes = {
  text: React.PropTypes.array,
};

export default PoemBody;
