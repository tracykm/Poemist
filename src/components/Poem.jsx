import React from 'react';
import './poem.scss';

const Poem = ({ poem }) => (
  <div>
    { poem.text.map(textSlice => (
      <span
        className={textSlice.isSelected ? 'is-selected' : 'not-selected'}
      >
        {textSlice.text}
      </span>
    ),
    )}
  </div>
);

export default Poem;
