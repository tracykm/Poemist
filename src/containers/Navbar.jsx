import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { toggleLogin } from 'src/actions/login.js';
import { logoutUser } from 'src/actions/ajax/user';

import './_navbar';

const Navbar = ({ toggleLogin, logoutUser, currentUser }) => (
  <div className="navbar">
    <h1>Poemist</h1>
    <ul>
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
          : <Link onClick={toggleLogin}>Login</Link> }
      </li>
    </ul>
  </div>
);

Navbar.propTypes = {
  currentUser: React.PropTypes.object,
  toggleLogin: React.PropTypes.func,
  logoutUser: React.PropTypes.func,
};

function mapStateToProps(state) {
  const currentUserId = state.current.userId;
  return {
    currentUser: state.users[currentUserId],
  };
}

export default connect(mapStateToProps, { toggleLogin, logoutUser })(Navbar);
