import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { deletePoem } from 'src/actions/ajax/poem';

const DeleteEditLinks = ({ poemId, authorId, deletePoem, currentUserId }) => (
  <div className="delete-edit-links">
    { authorId === currentUserId &&
      <span>
        <Link onClick={deletePoem.bind(null, poemId)}>delete</Link> | {' '}
        <Link to={{ pathname: `edit/write/${poemId}` }}>edit</Link>
      </span>
    }
  </div>
);

DeleteEditLinks.propTypes = {
  poemId: React.PropTypes.number,
  authorId: React.PropTypes.number,
  deletePoem: React.PropTypes.func,
  currentUserId: React.PropTypes.number,
};


const mapDispatchToProps = {
  deletePoem,
};

function mapStateToProps(state) {
  return {
    currentUserId: state.current.userId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEditLinks);
