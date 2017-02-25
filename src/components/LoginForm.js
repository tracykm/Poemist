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
    const signUpLink = (<a onClick={showOnSignUp}>sign up</a>)
    const logInLink = (<a onClick={showOnLogin}>log in</a>)
    return (
      <form onSubmit={this.handleSubmit} onChange={this.onChange}>
        {onSignUp ? logInLink : signUpLink}
        <br />
        <label>
          Username
          <input onChange={this.onUsernameChange} type="text" />
        </label>
        <br />
        <label>
          Password
          <input onChange={this.onPasswordChange} type="password" />
        </label>
        <p className="error">{logIn.errors}</p>
        <input type="submit" />
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
