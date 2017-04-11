import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { _showOnSignUp, _showOnLogin } from 'src/actions/logIn.js'
import { _logoutUser } from 'src/actions/ajax/user'
import Logo from 'src/components/Logo.jsx'

import './_navbar'

const LogInOut = ({ showOnSignUp, showOnLogin }) => (
  <span>
    <Link onClick={showOnSignUp}>Sign Up</Link> / <Link onClick={showOnLogin}>Log In</Link>
  </span>
)

const NavLink = ({pathname, currentPathname, title}) => (
  <Link to={{ pathname }} className={currentPathname === pathname ? 'active' : ''}>
    {title}
  </Link>
)

const Navbar = ({ currentPathname, showOnLogin, showOnSignUp, toggleShowSignIn, toggleShowLogin, logoutUser, currentUser }) => (
  <div className="header">
    <ul className="navbar">
      <li>
        <NavLink {...{ pathname: '/', title: 'Home', currentPathname }} />
      </li>
      <li>
        <NavLink {...{ pathname: '/new/write', title: 'Create', currentPathname }} />
      </li>
      <li>
        <NavLink {...{ pathname: '/about', title: 'About', currentPathname }} />
      </li>
      { currentUser &&
        <li>
          <NavLink {...{ pathname: `/user/${currentUser.id}`, title: 'Profile', currentPathname }} />
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
    currentPathname: state.routing.locationBeforeTransitions.pathname,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
