import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

import './_closeUpPoemView.scss';
import Poem from 'src/components/poem/Poem.jsx';
import { loginUser } from 'src/actions/ajaxActions';
import { toggleLogin } from 'src/actions/simpleActions';
import LoginForm from 'src/components/LoginForm';

class LoginModal extends React.Component {
  render() {
    const { showLogin, toggleLogin, loginUser } = this.props;
    return (
      <div>
        <Modal
          show={showLogin}
          className="video-modal"
          bsSize="large"
          onHide={toggleLogin}
        >
          <Modal.Header closeButton>
            <h1 className="text-center">Login</h1>
          </Modal.Header>
          <Modal.Body>
            <LoginForm loginUser={loginUser} />
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
    showLogin: state.login.showLogin,
  };
}

export default connect(mapStateToProps, { toggleLogin, loginUser })(LoginModal);
