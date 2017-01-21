import React from 'react';
import './_poemHeader';
// import { Link } from 'react-router';

const DeleteEditLinks = ({ poemId }) => (
  <div className="delete-edit-links">
    delete | edit
  </div>
);

DeleteEditLinks.propTypes = {
  poemId: React.PropTypes.number,
  isCurrentUser: React.PropTypes.bool,
};

const PoemHeader = ({ id, isCurrentUser }) => (
  <div className="poem-header">
    {isCurrentUser ? <DeleteEditLinks /> : <noscript />}
  </div>
);

// <Link to={{ pathname: `/poem/${id}` }}>poem link</Link>
PoemHeader.propTypes = {
  id: React.PropTypes.number,
  isCurrentUser: React.PropTypes.bool,
};

export default PoemHeader;
