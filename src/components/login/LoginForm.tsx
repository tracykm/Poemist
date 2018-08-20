import * as React from "react";
import LoginButton from "src/components/login/LoginButton";

class LoginForm extends React.PureComponent<{ hideModal: () => void }> {
  state = { username: "", password: "password", onSignUp: true };

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  toggleSignUp = () => {
    this.setState({ onSignUp: !this.state.onSignUp });
  };

  render() {
    const signUpLink = (
      <span>
        New user? <a onClick={this.toggleSignUp}>Sign Up Here</a>
      </span>
    );
    const loginLink = (
      <span>
        Already have an account?
        <a onClick={this.toggleSignUp}>Log In</a>
      </span>
    );
    return (
      <form
        className="login-form"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <h1 className="text-center">
          {this.state.onSignUp ? "Sign Up" : "Log in"}
        </h1>
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
        <LoginButton {...this.state} hideModal={this.props.hideModal} />
        <br />
        {this.state.onSignUp ? loginLink : signUpLink}
      </form>
    );
  }
}

export default LoginForm;
