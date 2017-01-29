import React from 'react';
import './_poemHeader';
import { Link } from 'react-router';
import DeleteEditLinks from 'src/containers/DeleteEditLinks.js';

const PoemHeader = (props) => (
  <div className="poem-header">
    <DeleteEditLinks {...props} />
    <Link to={{ pathname: `/poem/${props.poemId}` }}>view</Link>
  </div>
);

PoemHeader.propTypes = {
  poemId: React.PropTypes.number,
  authorId: React.PropTypes.number,
  isCurrentUser: React.PropTypes.bool,
  deletePoem: React.PropTypes.func,
};

export default PoemHeader;
