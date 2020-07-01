import * as React from "react"
import LoginButton from "src/components/login/LoginButton"
import { Form, Button } from "reactstrap"
import { random, commerce } from "faker"
import { capitalize } from "lodash"
import styled from "styled-components"
import { TextField } from "@material-ui/core"

const LoginDiv = styled(Form)`
  label {
    width: 100%;
  }
  font-size: 18px;
  .btn-link {
    padding: 0;
  }
`

function getRandomUserName() {
  return [...random.word().split(" "), ...commerce.color().split(" ")]
    .map((str) => capitalize(str))
    .join("")
}

class LoginForm extends React.PureComponent<{ hideModal: () => void }> {
  state = { username: "", password: "", onSignUp: true, errorStr: "" }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value })
  }

  getRandomUsernameChange = () => {
    console.log(getRandomUserName())
    this.setState({ username: getRandomUserName() })
  }

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value })
  }

  toggleSignUp = () => {
    this.setState({ onSignUp: !this.state.onSignUp })
  }

  render() {
    const signUpLink = (
      <span>
        New user?{" "}
        <Button color="link" onClick={this.toggleSignUp}>
          Sign Up Here
        </Button>
      </span>
    )
    const loginLink = (
      <span>
        Already have an account?
        <Button color="link" onClick={this.toggleSignUp}>
          Log In
        </Button>
      </span>
    )
    return (
      <LoginDiv
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <h1 className="text-center">
          {this.state.onSignUp ? "Sign Up" : "Log in"}
        </h1>
        <TextField
          fullWidth
          label="Username"
          onChange={this.onUsernameChange}
          data-test="usernameInput"
          value={this.state.username}
        />
        <Button
          className="generate"
          color="link"
          onClick={this.getRandomUsernameChange}
        >
          Generate Username
        </Button>
        <br />
        <br />
        <TextField
          fullWidth
          label="Password"
          onChange={this.onPasswordChange}
          type="password"
          data-test="passwordInput"
          value={this.state.password}
        />
        <br />
        <LoginButton
          {...this.state}
          hideModal={this.props.hideModal}
          setError={(errorStr) => this.setState({ errorStr })}
        />
        <br />
        {this.state.onSignUp ? loginLink : signUpLink}
      </LoginDiv>
    )
  }
}

export default LoginForm
