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
    const { onSignUp, signUpUser, logInUser } = this.props
    if (onSignUp) {
      signUpUser(this.state)
    } else {
      logInUser(this.state)
    }
  }

  render() {
    const { logIn, onSignUp, showOnLogin, showOnSignUp } = this.props
    // debugger
    const signUpLink = (<span>New user? <a onClick={showOnSignUp}>Sign Up Here</a></span>)
    const logInLink = (<span>Already have an account?<a onClick={showOnLogin}>Log In</a></span>)
    return (
      <form className="login-form" onSubmit={this.handleSubmit} onChange={this.onChange}>
        <h1 className="text-center">
          {onSignUp ? 'Sign Up' : 'Log in'}
        </h1>
        <p className="error">{logIn.errors}</p>
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
        {onSignUp ? logInLink : signUpLink}
      </form>
    )
  }
}

LoginForm.propTypes = {
  logIn: React.PropTypes.object,
  onSignUp: React.PropTypes.bool,
  showOnLogin: React.PropTypes.func,
  showOnSignUp: React.PropTypes.func,
  signUpUser: React.PropTypes.func,
  logInUser: React.PropTypes.func,
}

export default LoginForm
