var React = require('react');
var UserNav = require('./userNav/userNav');
var Header = require('./header');
var ApiUtil = require('../util/apiUtil');
var UserStore = require('../stores/userStore');
var LoginWindow = require('./loginWindow');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


module.exports = React.createClass({
  getInitialState: function(){
    return ({currentUser: undefined, showLogin: false});
  },
  toggleShowLogin: function(message){
    this.setState({showLogin: !this.state.showLogin});
    this.loginMessage = message;
  },
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._updateUser);
    ApiUtil.getCurrentUser();
    setInterval(function(){
      ApiUtil.getCurrentUser();
    }, 60000);
  },
  componentWillUnmount: function(){
    this.userListener.remove();
  },
  _updateUser: function(){
    var user = UserStore.currentUser();
    this.setState({currentUser: user});
  },
  shouldComponentUpdate: function(newProps, nextState) {
    var that = this;
    var fromURL = this.props.location.pathname;
    var toURL = newProps.location.pathname;
    if(fromURL !== toURL){
      $("main").addClass("pre-loading");
      $(window).load(function() {
        // alert('loaded');
      });
      setTimeout(function(){
        $("main").removeClass("pre-loading");
        that.forceUpdate();
      },200);
      return false;
    }else{
      return true;
    }
  },
  componentWillReceiveProps: function(newProps){

  },
  render: function () {
    return(
      <div className="app">
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        <UserNav currentUser={this.state.currentUser} toggleShowLogin={this.toggleShowLogin}/>
        <Header/>
        <div id="pleaseWait">
          <div className="circleSpinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
          {this.state.showLogin ? <LoginWindow message={this.loginMessage} toggleShowLogin={this.toggleShowLogin}/> : ""}
        <main className="pre-loading">
          {React.cloneElement(this.props.children,
            { currentUser: this.state.currentUser, toggleShowLogin: this.toggleShowLogin})}
        </main>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
