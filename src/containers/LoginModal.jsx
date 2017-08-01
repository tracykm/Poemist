import React from 'react'
import { connect } from 'react-redux'

import * as userDuck from 'src/ducks/users'
import * as loginDuck from 'src/ducks/login'
import LoginForm from 'src/components/LoginForm'

import './_loginModal.scss'

class LoginModal extends React.Component {
  render() {
    const onSignUp = this.props.hash === '#signUp'
    return (
      <LoginForm
        onSignUp={onSignUp}
        {...this.props}
      />
    )
  }
}

const mapDispachToProps = {
  showLogin: loginDuck.showLogin,
  showSignUp: loginDuck.showSignUp,
  toggleShowLogin: loginDuck.toggleShowLogin,
  signUpUser: userDuck.handleSignUpUser,
  loginUser: userDuck.handleLogInUser,
}

function mapStateToProps(state) {
  return {
    loginErrors: loginDuck.getLoginMessage(state),
    hash: state.routing.locationBeforeTransitions.hash,
  }
}

export default connect(mapStateToProps, mapDispachToProps)(LoginModal)
