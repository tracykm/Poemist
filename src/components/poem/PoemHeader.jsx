import React from 'react';
import './_poemHeader';
import { Link } from 'react-router';

const DeleteEditLinks = ({ poemId }) => (
  <div className="delete-edit-links">
    delete | <Link to={{ pathname: `edit/write/${poemId}` }}>edit</Link> | {' '}
  </div>
);

DeleteEditLinks.propTypes = {
  poemId: React.PropTypes.number,
  isCurrentUser: React.PropTypes.bool,
};

const PoemHeader = ({ id, isCurrentUser }) => (
  <div className="poem-header">
    {isCurrentUser ? <DeleteEditLinks poemId={id} /> : <noscript />}
    <Link to={{ pathname: `/poem/${id}` }}>view</Link>
  </div>
);

// <Link to={{ pathname: `/poem/${id}` }}>poem link</Link>
PoemHeader.propTypes = {
  id: React.PropTypes.number,
  isCurrentUser: React.PropTypes.bool,
};

export default PoemHeader;
