import React from 'react'
import { Fieldset, Field, createValue } from 'react-forms'

class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = { username: '', password: 'password' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { onSignUp, signUpUser, loginUser } = this.props;
    if (onSignUp) {
      signUpUser(this.state);
    } else {
      loginUser(this.state);
    }
  }

  render() {
    const { login, onSignUp, showOnLogin, showOnSignUp } = this.props;
    // debugger
    const signUpLink = (<a onClick={showOnSignUp}>sign up</a>);
    const loginLink = (<a onClick={showOnLogin}>log in</a>);
    return (
      <form onSubmit={this.handleSubmit} onChange={this.onChange}>
        {onSignUp ? loginLink : signUpLink}
        <label>
          Username
          <input onChange={this.onUsernameChange} type="text" />
        </label>
        <br />
        <label>
          Password
          <input onChange={this.onPasswordChange} type="password" />
        </label>
        <p className="error">{login.errors}</p>
        <input type="submit" />
      </form>
    );
  }
}

export default LoginForm;
