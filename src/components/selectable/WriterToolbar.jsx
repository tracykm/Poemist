import React from 'react';
import { Link } from 'react-router';

const WriterToolbar = ({ getNewPassage, toggleSelectBy, isSelectingByWord }) => {
  return (
    <div className="writer-toolbar">
      <button onClick={toggleSelectBy}>
        {isSelectingByWord ? 'select by letter?' : 'select by word?'}
      </button>
      <button onClick={getNewPassage}>
        New Passage?
      </button>
      <Link to={{ pathname: '/new/stylize' }}>Next</Link>
    </div>
  )
};

WriterToolbar.propTypes = {
  getNewPassage: React.PropTypes.func,
  toggleSelectBy: React.PropTypes.func,
  isSelectingByWord: React.PropTypes.boolean,
};

export default WriterToolbar;
