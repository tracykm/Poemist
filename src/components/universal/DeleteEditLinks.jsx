import PropTypes from 'prop-types';
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'

const DeleteEditLinks = ({ poemId, authorId, deletePoem, currentUserId }) => (
  <div className="delete-edit-links">
    {authorId &&
    authorId === currentUserId && ( // when not logged in would show undefined === undefined
        <span>
          <a onClick={deletePoem.bind(null, poemId)}>delete</a> |{' '}
          <Link to={`edit/write/${poemId}`}>edit</Link>
        </span>
      )}
  </div>
)

DeleteEditLinks.propTypes = {
  poemId: PropTypes.number,
  authorId: PropTypes.number,
  deletePoem: PropTypes.func,
  currentUserId: PropTypes.number,
}

const mapDispatchToProps = {
  deletePoem: poemDuck.handleDeletePoem,
}

function mapStateToProps(state) {
  return {
    currentUserId: userDuck.getCurrentUserId(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEditLinks)
