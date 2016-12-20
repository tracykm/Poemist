import React from 'react';
import { Link } from 'react-router';

const Navbar = ({ children }) => (
  <div>
    <h1>Poemist</h1>
    <ul>
      <li>
        <Link to={{ pathname: `/poem/${2}` }}>Home</Link>
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
    </ul>
  </div>
);

export default Navbar;
