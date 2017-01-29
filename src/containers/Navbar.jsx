import React from 'react';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleLogin } from 'src/actions/login.js';
import { logoutUser } from 'src/actions/ajax/user';
import LoginForm from 'src/components/LoginForm';

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
        <Link to={{ pathname: `/poem/${3}` }}>About</Link>
      </li>
      <li>
        <Link to={{ pathname: `/poem/${3}` }}>Profile</Link>
      </li>
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

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { toggleLogin, logoutUser })(Navbar);
