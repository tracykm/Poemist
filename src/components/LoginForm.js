import React from 'react'
import {Fieldset, Field, createValue} from 'react-forms'

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    const formValue = createValue({
      value: props.value,
      onChange: this.onChange.bind(this),
    });
    this.state = { formValue };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(formValue) {
    this.setState({ formValue });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.loginUser({ user: this.state })
    debugger
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Fieldset formValue={this.state.formValue}>
          <Field select="username" label="Username" />
          <Field select="password" label="Password" />
        </Fieldset>

        <input type="submit" />
      </form>
    );
  }
}

export default LoginForm;
