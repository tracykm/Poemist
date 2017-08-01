import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { showSignUp, showLogin } from 'src/ducks/login.js'
import * as userDuck from 'src/ducks/users'
import PoemistLogo from 'src/components/Logo.jsx'

import './_navbar'

const LogInOut = ({ showSignUp, showLogin }) => (
  <span>
    <Link to={{ hash: '#login' }} onClick={showSignUp}>Sign Up</Link> / <Link to={{ hash: '#signUp' }} onClick={showLogin}>Log In</Link>
  </span>
)

const NavLink = ({pathname, currentPathname, title}) => (
  <Link to={{ pathname }} className={currentPathname === pathname ? 'active' : ''}>
    {title}
  </Link>
)

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: false };
  }

  render() {
    const { currentPathname, showLogin, showSignUp, toggleShowSignIn, toggleShowLogin, logoutUser, currentUser } = this.props;
    const { isExpanded } = this.state;
    return (
      <div className="header">
        <Link className="logo" to={{ pathname: '/' }}>
          <PoemistLogo />
        </Link>
        <div className="navbar">
          <button className="btn btn-link">
            <i
              className="hamburger fa fa-bars"
              onClick={() => this.setState({ isExpanded: !isExpanded })}
            >
              bars
            </i>
          </button>
          <ul className={isExpanded ? "navbarMenu" : "navbarMenu expanded"}>
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
                : <LogInOut showSignUp={showSignUp} showLogin={showLogin} />}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  currentUser: React.PropTypes.object,
  toggleShowLogin: React.PropTypes.func,
  logoutUser: React.PropTypes.func,
}

const mapDispatchToProps = {
  showLogin: showLogin,
  showSignUp: showSignUp,
  logoutUser: userDuck.handleLogoutUser,
}

function mapStateToProps(state) {
  return {
    currentUser: userDuck.getCurrentUser(state),
    currentPathname: state.routing.locationBeforeTransitions.pathname,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
