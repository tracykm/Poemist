import React from 'react';
import { Link } from 'react-router';

const PoemHeader = ({ id }) => (
  <div className="poem-header">
    <Link to={{ pathname: `/poem/${id}` }}>poem link</Link>
    <div className="poem-header">x</div>
  </div>
);

PoemHeader.propTypes = {
  id: React.PropTypes.number,
};

export default PoemHeader;
