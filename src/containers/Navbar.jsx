import React from 'react';
import { Link } from 'react-router';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleLogin } from 'src/actions/simpleActions';
import LoginForm from 'src/components/LoginForm';

import './_navbar';

const Navbar = ({ toggleLogin }) => (
  <div className="navbar">
    <h1>Poemist</h1>
    <ul>
      <li>
        <Link to={{ pathname: '/' }}>Home</Link>
      </li>
      <li>
        <Link to={{ pathname: `/poem/${3}` }}>Create</Link>
      </li>
      <li>
        <Link to={{ pathname: `/poem/${3}` }}>About</Link>
      </li>
      <li>
        <Link to={{ pathname: `/poem/${3}` }}>Profile</Link>
      </li>
      <li>
        <Link onClick={toggleLogin}>Login</Link>
      </li>
    </ul>
  </div>
);

function mapStateToProps(state) {
  return {
    poem: state.poems.currentPoem,
  };
}

export default connect(mapStateToProps, { toggleLogin })(Navbar);
