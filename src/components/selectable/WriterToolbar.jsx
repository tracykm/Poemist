import React from 'react';
import { Link } from 'react-router';

const WriterToolbar = ({ inEditView, poemId, getNewPassage, toggleSelectBy, isSelectingByWord }) => {
  const nextUrl = inEditView ? `/edit/stylize/${poemId}` : 'new/stylize';
  return (
    <div className="writer-toolbar">
      <button onClick={toggleSelectBy} data-ux="toggle-select-by">
        {isSelectingByWord ? 'select by letter?' : 'select by word?'}
      </button>
      <button onClick={getNewPassage} data-ux="get-new-passage">
        New Passage?
      </button>
      <Link to={{ pathname: nextUrl }}>Next</Link>
    </div>
  );
};

WriterToolbar.propTypes = {
  getNewPassage: React.PropTypes.func.isRequired,
  toggleSelectBy: React.PropTypes.func.isRequired,
  isSelectingByWord: React.PropTypes.bool,
  inEditView: React.PropTypes.bool,
  poemId: React.PropTypes.string, // TODO: should be number
};

export default WriterToolbar;
