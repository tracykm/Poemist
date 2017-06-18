import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { _deletePoem } from 'src/ducks/poems'

const DeleteEditLinks = ({ poemId, authorId, deletePoem, currentUserId }) => (
  <div className="delete-edit-links">
    { authorId && authorId === currentUserId && // when not logged in would show undefined === undefined
      <span>
        <Link onClick={deletePoem.bind(null, poemId)}>delete</Link> | {' '}
        <Link to={{ pathname: `edit/write/${poemId}` }}>edit</Link>
      </span>
    }
  </div>
)

DeleteEditLinks.propTypes = {
  poemId: React.PropTypes.number,
  authorId: React.PropTypes.number,
  deletePoem: React.PropTypes.func,
  currentUserId: React.PropTypes.number,
}


const mapDispatchToProps = {
  deletePoem: _deletePoem,
}

function mapStateToProps(state) {
  return {
    currentUserId: state.current.userId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEditLinks)
