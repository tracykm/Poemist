import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import './_closeUpPoemView.scss';
import { loginUser, signUpUser } from 'src/actions/ajax/user';
import { _toggleShowLogin, _showOnLogin, _showOnSignUp } from 'src/actions/login.js';
import LoginForm from 'src/components/LoginForm';

class LoginModal extends React.Component {
  render() {
    const { login, toggleShowLogin, loginUser, signUpUser, showOnLogin, showOnSignUp } = this.props;
    // debugger
    return (
      <div>
        <Modal
          show={login.showLogin}
          className="video-modal"
          bsSize="large"
          onHide={toggleShowLogin}
        >
          <Modal.Header closeButton>
            <h1 className="text-center">
              {login.onSignUp ? 'Sign Up' : 'Log in'}
            </h1>
          </Modal.Header>
          <Modal.Body>
            <LoginForm
              onSignUp={login.onSignUp}
              showOnSignUp={showOnSignUp}
              showOnLogin={showOnLogin}
              loginUser={loginUser}
              signUpUser={signUpUser}
              login={login}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  login: React.PropTypes.object,
};

const mapDispachToProps = {
  showOnLogin: _showOnLogin,
  showOnSignUp: _showOnSignUp,
  toggleShowLogin: _toggleShowLogin,
  signUpUser,
  loginUser,
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps, mapDispachToProps)(LoginModal);
