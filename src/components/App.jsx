import React from 'react';
import Navbar from 'src/components/Navbar';
import LoginModal from 'src/containers/LoginModal';

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
