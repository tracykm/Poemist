import React from 'react'
import { Fieldset, Field, createValue } from 'react-forms'

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.loginUser(this.state)
  }

  render() {
    const { login } = this.props;
    return (
      <form onSubmit={this.handleSubmit} onChange={this.onChange}>
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
