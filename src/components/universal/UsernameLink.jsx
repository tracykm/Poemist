import PropTypes from 'prop-types';
import React from 'react'
import { Link } from 'react-router-dom'

const UsernameLink = ({ username, userId }) => (
  <div className="username" data-test="UsernameLink">
    <Link to={`/user/${userId}`}>{username}</Link>
  </div>
)

UsernameLink.propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
}

export default UsernameLink
