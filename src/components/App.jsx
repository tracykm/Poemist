import React from 'react';
import { connect } from 'react-redux';

import Navbar from 'src/containers/Navbar';
import LoginModal from 'src/containers/LoginModal';
import { getCurrentUser } from 'src/actions/ajax/user.js';

// import 'reset-css/reset.css';
import './_app.scss';

class App extends React.Component {

  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div className="app">
        <Navbar />
        {this.props.children}
        <LoginModal />
      </div>
    );
  }

}

App.propTypes = {
  children: React.PropTypes.object,
  getCurrentUser: React.PropTypes.func,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { getCurrentUser })(App);
