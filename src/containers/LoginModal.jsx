import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import './_closeUpPoemView.scss';
import Poem from 'src/components/poem/Poem.jsx';
import { loginUser, signUpUser } from 'src/actions/ajaxActions';
import { toggleLogin } from 'src/actions/login.js';
import LoginForm from 'src/components/LoginForm';

class LoginModal extends React.Component {
  render() {
    const { login, toggleLogin, loginUser, signUpUser } = this.props;
    return (
      <div>
        <Modal
          show={login.showLogin}
          className="video-modal"
          bsSize="large"
          onHide={toggleLogin}
        >
          <Modal.Header closeButton>
            <h1 className="text-center">Login</h1>
          </Modal.Header>
          <Modal.Body>
            <LoginForm loginUser={loginUser} signUpUser={signUpUser} login={login} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  showLogin: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps, { toggleLogin, signUpUser, loginUser })(LoginModal);
