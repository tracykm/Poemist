var React = require('react');
var History = require('react-router').History;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil');
var LoginErrorStore = require('../stores/loginErrorStore');

module.exports = React.createClass({
  mixins: [LinkedStateMixin, History],
  getInitialState: function(){
    return ({loggedIn: false, errors: "", showSignUp: true, username: ""});
  },
  componentDidMount: function(){
    this.loginListener = LoginErrorStore.addListener(this._loginResponse);
  },
  componentWillUnmount: function(){
    this.loginListener.remove();
  },
  createUser: function () {
    alert("user created "+this.state.newUsername);
  },
  _submit: function () {
    if(this.state.showSignUp){
      ApiUtil.signUpUser({username: this.state.username, password: this.state.password});
      this.setState({username: "", password: ""});
    }else{
      ApiUtil.logUserIn({username: this.state.username, password: this.state.password});
      this.setState({username: "", password: ""});
    }
  },
  _loginResponse: function () {
    var message = LoginErrorStore.all();
    debugger
    if(message === "Success"){
      this.setState({loggedIn: true})
      this.props.updatePoemState({showLogin: false});
    }
    this.setState({errors: message[0]})
  },
  _toggleSignUp: function () {
    this.setState({showSignUp: !this.state.showSignUp})
  },
  render: function () {
    var toggleText;
    if(this.state.showSignUp){
      toggleText = (
        <div>Already have an account? <span className="link" onClick={this._toggleSignUp}>
             Log In
          </span>
        </div>);
    }else{
      toggleText = (
        <div>New user? <span className="link" onClick={this._toggleSignUp}>
             Sign Up Here
          </span>
        </div>);
    }
    return(
      <div className="fixedLogin">
        <div className="loginWindow">
          <h2>{this.state.showSignUp ? "Sign Up" : "Log In"}</h2>
          <div className="loginErrors">{this.state.errors}</div>
          <form onSubmit={this._submit}>
            <label>Username<br/>
              <input type="text" valueLink={this.linkState('username')}></input>
            </label>
            <br/>
            <label>Password<br/>
              <input type="password" valueLink={this.linkState('password')}></input>
            </label><br/>
            <input type="submit"></input>
          </form>
          {toggleText}
        </div>
      </div>
    );
  }
});
