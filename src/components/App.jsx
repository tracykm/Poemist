import React from 'react';
import Navbar from 'src/components/Navbar';

const App = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
