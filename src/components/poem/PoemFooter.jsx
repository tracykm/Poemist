import PropTypes from 'prop-types';
import React from 'react'
import UsernameLink from 'src/components/universal/UsernameLink.jsx'

const PoemFooter = ({ authorUsername, authorId }) => (
  <div className="poem-footer">
    <UsernameLink userId={authorId} username={authorUsername} />
  </div>
)

PoemFooter.propTypes = {
  authorUsername: PropTypes.string,
  authorId: PropTypes.number,
}

export default PoemFooter
