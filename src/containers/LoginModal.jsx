import React from 'react'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'

import { _logInUser, _signUpUser } from 'src/ducks/users'
import { _toggleShowLogin, _showOnLogin, _showOnSignUp } from 'src/ducks/logIn.js'
import LoginForm from 'src/components/LoginForm'

import './_loginModal.scss'

class LoginModal extends React.Component {
  render() {
    const { logIn, toggleShowLogin, hash, logInUser, signUpUser, showOnLogin, showOnSignUp } = this.props
    // console.log('hash', hash);
    const onSignUp = hash === '#signUp'
    return (
      <LoginForm
        {...{
          showOnSignUp,
          onSignUp,
          showOnLogin,
          logInUser,
          signUpUser,
          logIn,
        }}
      />
    )
  }
}

LoginModal.propTypes = {
  logIn: React.PropTypes.object,
  toggleShowLogin: React.PropTypes.func,
  logInUser: React.PropTypes.func,
  signUpUser: React.PropTypes.func,
  showOnLogin: React.PropTypes.func,
  showOnSignUp: React.PropTypes.func,
}

const mapDispachToProps = {
  showOnLogin: _showOnLogin,
  showOnSignUp: _showOnSignUp,
  toggleShowLogin: _toggleShowLogin,
  signUpUser: _signUpUser,
  logInUser: _logInUser,
}

function mapStateToProps(state) {
  return {
    logIn: state.logIn,
    hash: state.routing.locationBeforeTransitions.hash
  }
}

export default connect(mapStateToProps, mapDispachToProps)(LoginModal)
