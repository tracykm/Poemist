import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { _showOnSignUp, _showOnLogin } from 'src/actions/logIn.js'
import { _logoutUser } from 'src/actions/ajax/user'
import Logo from 'src/components/Logo.jsx'

import './_navbar'

const LogInOut = ({ showOnSignUp, showOnLogin }) => (
  <span>
    <Link onClick={showOnSignUp}>Sign In</Link> / <Link onClick={showOnLogin}>Log In</Link>
  </span>
)

const Navbar = ({ showOnLogin, showOnSignUp, toggleShowSignIn, toggleShowLogin, logoutUser, currentUser }) => (
  <div className="header">
    <ul className="navbar">
      <li>
        <Link to={{ pathname: '/' }}>Home</Link>
      </li>
      <li>
        <Link to={{ pathname: '/new/write' }}>Create</Link>
      </li>
      <li>
        <Link to={{ pathname: '/about' }}>About</Link>
      </li>
      { currentUser &&
        <li>
          <Link to={{ pathname: `/user/${currentUser.id}` }}>Profile</Link>
        </li>
      }
      <li>
        { currentUser ?
          <span>
            Hi {currentUser.username}! <Link onClick={logoutUser}>Logout</Link>
          </span>
          : <LogInOut showOnSignUp={showOnSignUp} showOnLogin={showOnLogin} />}
      </li>
    </ul>
    <Link to={{ pathname: '/' }}>
      <Logo />
    </Link>
  </div>
)

Navbar.propTypes = {
  currentUser: React.PropTypes.object,
  toggleShowLogin: React.PropTypes.func,
  logoutUser: React.PropTypes.func,
}

const mapDispatchToProps = {
  showOnLogin: _showOnLogin,
  showOnSignUp: _showOnSignUp,
  logoutUser: _logoutUser,
}

function mapStateToProps(state) {
  const currentUserId = state.current.userId
  return {
    currentUser: state.users[currentUserId],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
