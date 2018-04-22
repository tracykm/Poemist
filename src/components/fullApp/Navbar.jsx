import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PoemistLogo from 'src/components/fullApp/Logo.jsx'
import { Query } from 'react-apollo'
import CURRENT_USER from 'src/components/fullApp/currentUser'
import './_navbar.scss'

const LogInOut = ({ toggleShowLogin }) => (
  <span>
    <a onClick={toggleShowLogin} data-test="signUpLink">
      Sign Up
    </a>
  </span>
)

const NavBarWData = props => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return <Navbar {...props} currentUser={data.current} />
    }}
  </Query>
)

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isExpanded: false }
  }

  render() {
    const {
      showLogin,
      showSignUp,
      toggleShowSignIn,
      toggleShowLogin,
      logoutUser,
      currentUser,
    } = this.props
    const { isExpanded } = this.state
    return (
      <div className="header">
        <NavLink to="/" className="logo">
          <PoemistLogo />
        </NavLink>
        <div className="navbar">
          <button className="btn btn-link">
            <i
              className="hamburger fa fa-bars"
              onClick={() => this.setState({ isExpanded: !isExpanded })}
            >
              menu
            </i>
          </button>
          <ul className={isExpanded ? 'navbarMenu' : 'navbarMenu expanded'}>
            <li>
              <NavLink activeClassName="active" exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/new/write">
                Create
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </li>
            {currentUser && (
              <li>
                <NavLink
                  activeClassName="active"
                  to={`/user/${currentUser.id}`}
                  data-test="profileLink"
                >
                  Profile
                </NavLink>
              </li>
            )}
            <li>
              {currentUser ? (
                <span>
                  Hi {currentUser.username}!{' '}
                  <a
                    onClick={() => {
                      localStorage.clear()
                      location.reload()
                    }}
                  >
                    Logout
                  </a>
                </span>
              ) : (
                <LogInOut toggleShowLogin={toggleShowLogin} />
              )}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(NavBarWData)
