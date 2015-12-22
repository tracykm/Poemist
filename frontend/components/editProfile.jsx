var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil');
var UserStore = require('../stores/userStore');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [LinkedStateMixin, History],
  getInitialState: function(){
    return ({showNewUsername: false, showNewPassword: false, user: UserStore.current_user,
      username: "", newPassword: ""});
  },
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._updateUser);
    ApiUtil.getCurrentUser();
  },
  componentWillUnmount: function(){
    this.userListener.remove();
  },
  _updateUser: function(){
    var user = UserStore.currentUser();
    if(user){
      this.setState({user: user, username: user.username});
    }
  },
  showUsername: function(){
    this.setState({showNewUsername: true});
  },
  showPassord: function(){
    this.setState({showNewPassword: true});
  },
  updateProfile: function(e){
    console.log("updateProfile");
    ApiUtil.updateUser({username: this.state.username, id: window.current_user.id});
    this.history.pushState(null, "/profile");
  },


  render: function () {
    var username = window.current_user.username;
    return(
      <form className="editProfile" onSubmit={this.updateProfile}>
        <h2>Edit Profile</h2>
        <label onClick={this.showUsername}>Username:
          {this.state.showNewUsername ? <input valueLink={this.linkState('username')}
            type="text" defaultValue={username}></input> : username}
        </label>
        <br/>
        <label onClick={this.showPassord}>New Password:
          {this.state.showNewPassword ? <input valueLink={this.linkState('newPassword')}
            type="text"></input> : ""}
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
