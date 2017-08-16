import React from 'react'
import { Link } from 'react-router-dom'

const UsernameLink = ({ username, userId }) => (
  <div className="username" data-test="UsernameLink">
    <Link to={`/user/${userId}`}>{username}</Link>
  </div>
)

UsernameLink.propTypes = {
  userId: React.PropTypes.number,
  username: React.PropTypes.string,
}

export default UsernameLink
