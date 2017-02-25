import React from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'

import './_closeUpPoemView.scss'
import { logInUser, signUpUser } from 'src/actions/ajax/user'
import { _toggleShowLogin, _showOnLogin, _showOnSignUp } from 'src/actions/logIn.js'
import LoginForm from 'src/components/LoginForm'

class LoginModal extends React.Component {
  render() {
    const { logIn, toggleShowLogin, logInUser, signUpUser, showOnLogin, showOnSignUp } = this.props
    // debugger
    return (
      <div>
        <Modal
          show={logIn.showLogin}
          className="video-modal"
          bsSize="large"
          onHide={toggleShowLogin}
        >
          <Modal.Header closeButton>
            <h1 className="text-center">
              {logIn.onSignUp ? 'Sign Up' : 'Log in'}
            </h1>
          </Modal.Header>
          <Modal.Body>
            <LoginForm
              onSignUp={logIn.onSignUp}
              showOnSignUp={showOnSignUp}
              showOnLogin={showOnLogin}
              logInUser={logInUser}
              signUpUser={signUpUser}
              logIn={logIn}
            />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

LoginModal.propTypes = {
  logIn: React.PropTypes.object,
}

const mapDispachToProps = {
  showOnLogin: _showOnLogin,
  showOnSignUp: _showOnSignUp,
  toggleShowLogin: _toggleShowLogin,
  signUpUser,
  logInUser,
}

function mapStateToProps(state) {
  return {
    logIn: state.logIn,
  }
}

export default connect(mapStateToProps, mapDispachToProps)(LoginModal)
