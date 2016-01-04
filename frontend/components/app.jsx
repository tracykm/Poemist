var React = require('react');
var UserNav = require('./userNav/userNav');
var Header = require('./header');
var ApiUtil = require('../util/apiUtil');
var UserStore = require('../stores/userStore');
var LoginWindow = require('./loginWindow');

module.exports = React.createClass({
  getInitialState: function(){
    return ({currentUser: undefined, showLogin: false});
  },
  toggleShowLogin: function(){
    this.setState({showLogin: !this.state.showLogin});
  },
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._updateUser);
    if(window.current_user){
      ApiUtil.getCurrentUser();
    }
  },
  componentWillUnmount: function(){
    this.userListener.remove();
  },
  _updateUser: function(){
    debugger
    var user = UserStore.currentUser();
    this.setState({currentUser: user});
  },
  render: function () {
    return(
      <div className="app">
        <UserNav currentUser={this.state.currentUser} toggleShowLogin={this.toggleShowLogin}/>
        <Header/>
        <main>
          {this.state.showLogin ? <LoginWindow toggleShowLogin={this.toggleShowLogin}/> : ""}
          {React.cloneElement(this.props.children,
            { currentUser: this.state.currentUser})}
        </main>
      </div>
    );
  }
});
