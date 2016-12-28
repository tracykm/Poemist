import React from 'react';

const PoemFooter = ({ author }) => (
  <div className="poem-footer">
    -{author}
  </div>
);

PoemFooter.propTypes = {
  author: React.PropTypes.string,
};

export default PoemFooter;
