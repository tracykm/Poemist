import React from 'react'
import UsernameLink from 'src/components/universal/UsernameLink.jsx'

const PoemFooter = ({ authorUsername, authorId }) => (
  <div className="poem-footer">
    <UsernameLink userId={authorId} username={authorUsername} />
  </div>
)

export default PoemFooter
