import React from 'react'
import { Link } from 'react-router'

const UsernameLink = ({ username, userId }) => (
  <div className="username">
    <Link to={{ pathname: `/user/${userId}` }}>{username}</Link>
  </div>
)

UsernameLink.propTypes = {
  userId: React.PropTypes.number,
  username: React.PropTypes.string,
}

export default UsernameLink
