import React from 'react';
import Poem from 'src/components/poem/Poem.jsx';

import './_indexView.scss';

const IndexView = ({ poems }) => (
  <div className="home-view">
    {
      poems ? poems.reverse().map((poem, i) => ( // make oldest to newest
        poem && // TODO: remove this hack around null values when deleted
          <Poem poem={poem} key={i} />
      ))
      : 'loading'
    }
  </div>
);

export default IndexView;
