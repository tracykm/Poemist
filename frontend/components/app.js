var React = require('react');
var UserNav = require('./userNav/userNav');
var Header = require('./header');
var Footer = require('./footer');
var LoginWindow = require('./loginWindow');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var svgFilters = require('../svgFilters');
var _ = require('underscore');
const { connect } = require('react-redux');

const App = React.createClass({
  getInitialState: function(){
    return ({showLogin: false});
  },
  toggleShowLogin: function(opts){
    opts = opts || {};
    _.defaults(opts, {message: "", showSignUp: true});
    console.log("showSignUp", opts.showSignUp);
    this.setState({showLogin: !this.state.showLogin});
    this.loginOpts = opts;
  },
  shouldComponentUpdate: function(newProps, nextState) {
    var that = this;
    var fromURL = this.props.location.pathname;
    var toURL = newProps.location.pathname;

    var fromURLDir = fromURL.split("/")[1];
    var toURLDir = toURL.split("/")[1];

    // if(fromURLDir === "new" && toURLDir !== "new" ||
    //     fromURLDir === "edit" && toURLDir !== "edit" ){
    //   if (confirm('Are you sure you want to scrap this poem?')) {
    //   } else {
    //     return false;
    //   }
    // }

    if(fromURL !== toURL){
      if(fromURLDir === "new" && toURLDir === "new" ||
        fromURLDir === "edit" && toURLDir === "edit"){
         return true;
       }
      $("main").addClass("pre-loading");
      $(window).load(function() {
        // alert('loaded');
      });
      setTimeout(function(){
        if(toURL.split("/")[1] === "poem" || toURL.split("/")[1] === "user"){
          window.scrollTo(0,0);
        }
        $("main").removeClass("pre-loading");
        that.forceUpdate();
        svgFilters.addSVG();
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
        <UserNav currentUser={this.props.currentUser} toggleShowLogin={this.toggleShowLogin}/>
        <Header/>
        <div id="pleaseWait">
          <div className="circleSpinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
          {this.state.showLogin ? <LoginWindow message={this.loginOpts.message} showSignUp={this.loginOpts.showSignUp} toggleShowLogin={this.toggleShowLogin}/> : ""}
        <main className="pre-loading">
          {React.cloneElement(this.props.children,
            { currentUser: this.props.currentUser, toggleShowLogin: this.toggleShowLogin})}
        </main>
        <Footer/>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

function mapStateToProps(state) {
  debugger
  return {
    currentUser: state.currentUser,
  };
}

module.exports = connect(mapStateToProps)(App);
