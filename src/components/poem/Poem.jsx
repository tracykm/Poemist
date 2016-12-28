import React from 'react';

import PoemHeader from './PoemHeader';
import PoemBody from './PoemBody';
import PoemFooter from './PoemFooter';

import './_poem.scss';

const Poem = ({ poem }) => {
  if (!poem) {
    return (
      <div className="poem">
        loading...
      </div>
    );
  }
  const { id, text, author } = poem;
  return (
    <div className="poem">
      <PoemHeader id={id} />
      <PoemBody text={text} />
      <PoemFooter author={author} />
    </div>
  );
};

Poem.propTypes = {
  poem: React.PropTypes.object,
};

export default Poem;
