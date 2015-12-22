var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    return ({newUsername: false, newPassword: false, username:window.current_user.username});
  },
  showUsername: function(){
    console.log("boo");
    this.setState({newUsername: true});
  },
  updateProfile: function(e){
    console.log("updateProfile");
    ApiUtil.updateUser({username: this.state.username, id: window.current_user.id});
  },

  render: function () {
    var username = window.current_user.username;
    return(
      <form className="editProfile" onSubmit={this.updateProfile}>
        <h2>Edit Profile</h2>
        <label onClick={this.showUsername}>Username:
          {this.state.newUsername ? <input valueLink={this.linkState('username')}
            type="text" defaultValue={username}></input> : username}
        </label>
        <br/>
        <label>New Password:
          <input type="password"></input>
        </label>
        <br/><br/>
        <label>Old Password
          <input type="text"></input>
        </label>
        <br/>
        <input type="submit"></input>
      </form>
    );
  }
});
