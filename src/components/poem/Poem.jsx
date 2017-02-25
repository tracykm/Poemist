import React from 'react';

import PoemHeader from './PoemHeader';
import PoemBody from './PoemBody';
import PoemFooter from './PoemFooter';

import './_poem.scss';

const Poem = (props) => {
  let { poem } = props;
  if (!poem) {
    return (
      <div className="poem">
        loading...
      </div>
    );
  }
  const { id, backgroundId, colorRange, text, author, authorId } = poem;
  return (
    <div className={`poem style-${backgroundId} color-${colorRange}`}>
      <div className="background-img" />
      <PoemHeader poemId={id} authorId={authorId} />
      <PoemBody text={text} />
      <PoemFooter authorUsername={author} authorId={authorId} />
    </div>
  );
};

Poem.propTypes = {
  poem: React.PropTypes.object,
};

export default Poem;
