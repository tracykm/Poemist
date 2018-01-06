import PropTypes from 'prop-types';
import React from 'react'
// import { Fieldset, Field, createValue } from 'react-forms'

class LoginForm extends React.Component {
  constructor() {
    super()
    this.state = { username: '', password: 'password' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value })
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { isOnSignUp, signUpUser, loginUser } = this.props
    const submit = isOnSignUp ? signUpUser : loginUser
    submit(this.state).then(res => {})
  }

  render() {
    const { loginErrors, showLogin, showSignUp, isOnSignUp } = this.props
    // debugger
    const signUpLink = (
      <span>
        New user? <a onClick={showSignUp}>Sign Up Here</a>
      </span>
    )
    const loginLink = (
      <span>
        Already have an account?<a onClick={showLogin}>Log In</a>
      </span>
    )
    return (
      <form
        className="login-form"
        onSubmit={this.handleSubmit}
        onChange={this.onChange}
      >
        <h1 className="text-center">{isOnSignUp ? 'Sign Up' : 'Log in'}</h1>
        <p className="error">{loginErrors}</p>
        <br />
        <label>
          Username
          <br />
          <input
            onChange={this.onUsernameChange}
            type="text"
            data-test="usernameInput"
          />
        </label>
        <br />
        <label>
          Password
          <br />
          <input
            onChange={this.onPasswordChange}
            type="password"
            data-test="passwordInput"
          />
        </label>
        <br />
        <input type="submit" data-test="submit" />
        <br />
        {isOnSignUp ? loginLink : signUpLink}
      </form>
    )
  }
}

LoginForm.propTypes = {
  loginErrors: PropTypes.string,
  isOnSignUp: PropTypes.bool,
  showLogin: PropTypes.func,
  showSignUp: PropTypes.func,
  signUpUser: PropTypes.func,
  loginUser: PropTypes.func,
}

export default LoginForm
