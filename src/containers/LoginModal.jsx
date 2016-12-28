import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleLogin } from 'src/actions/index';

import './_closeUpPoemView.scss';
import Poem from 'src/components/poem/Poem.jsx';

const LoginModal = ({ showLogin }) => {
  return (
  <div>
    <Modal
      show={showLogin}
      className="video-modal"
      bsSize="large"
    >
      <Modal.Body>
        lalaasdfsf
      </Modal.Body>
    </Modal>
  </div>
)};

LoginModal.propTypes = {
  showLogin: React.PropTypes.bool,
};


function mapStateToProps(state) {
  return {
    showLogin: state.login.showLogin,
  };
}

export default connect(mapStateToProps)(LoginModal);
