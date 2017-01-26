import React from 'react';
import Navbar from 'src/containers/Navbar';
import LoginModal from 'src/containers/LoginModal';

import 'reset-css/reset.css';
import './_app.scss';

const App = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <LoginModal />
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
