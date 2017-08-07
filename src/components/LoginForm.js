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
    const { onSignUp, signUpUser, loginUser } = this.props
    if (onSignUp) {
      signUpUser(this.state)
    } else {
      loginUser(this.state)
    }
  }

  render() {
    const { loginErrors, showLogin, showSignUp } = this.props
    // debugger
    const signUpLink = (<span>New user? <a onClick={showSignUp}>Sign Up Here</a></span>)
    const loginLink = (<span>Already have an account?<a onClick={showLogin}>Log In</a></span>)
    return (
      <form className="login-form" onSubmit={this.handleSubmit} onChange={this.onChange}>
        <h1 className="text-center">
          {showLogin ? 'Log in' : 'Sign Up'}
        </h1>
        <p className="error">{loginErrors}</p>
        <br />
        <label>
          Username
          <br />
          <input onChange={this.onUsernameChange} type="text" />
        </label>
        <br />
        <label>
          Password
          <br />
          <input onChange={this.onPasswordChange} type="password" />
        </label>
        <br />
        <input type="submit" />
        <br />
        {showLogin ? signUpLink : loginLink}
      </form>
    )
  }
}

LoginForm.propTypes = {
  loginErrors: React.PropTypes.object,
  onSignUp: React.PropTypes.bool,
  showLogin: React.PropTypes.func,
  showSignUp: React.PropTypes.func,
  signUpUser: React.PropTypes.func,
  loginUser: React.PropTypes.func,
}

export default LoginForm
