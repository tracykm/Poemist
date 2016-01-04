var React = require('react');
var UserNav = require('./userNav/userNav');
var Header = require('./header');
var ApiUtil = require('../util/apiUtil');
var UserStore = require('../stores/userStore');

module.exports = React.createClass({
  getInitialState: function(){
    return ({currentUser: undefined});
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
    var user = UserStore.currentUser();
    if(user){
      this.setState({currentUser: user});
    }
  },

  render: function () {
    return(
      <div className="app">
        <UserNav currentUser={this.state.currentUser}/>
        <Header/>
        <main>
          {React.cloneElement(this.props.children,
            { currentUser: this.state.currentUser})}
        </main>
      </div>
    );
  }
});
