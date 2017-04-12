import React from 'react'
import DeleteEditLinks from 'src/containers/DeleteEditLinks.jsx'
import { Link } from 'react-router'

import './_poemHeader'

const PoemHeader = ({ authorId, poemId }) => (
  <div className="poem-header">
    <DeleteEditLinks {...{ authorId, poemId }} />
    {poemId && <Link to={{ pathname: `/poem/${poemId}` }}>view</Link>}
  </div>
)

PoemHeader.propTypes = {
  poemId: React.PropTypes.number,
  authorId: React.PropTypes.number,
}

export default PoemHeader
