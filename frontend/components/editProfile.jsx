var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil');
var UserStore = require('../stores/userStore');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [LinkedStateMixin, History],
  getInitialState: function(){
    return ({showUsername: true, showDescription: true, user: UserStore.current_user});
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
      this.setState({user: user, username: user.username, description: user.description});
    }
  },
  showUsername: function(){
    this.setState({showUsername: true});
  },
  showDescription: function(){
    this.setState({showDescription: true});
  },
  _resetUsername: function(){
    this.setState({username: this.state.user.username});
  },
  updateProfile: function(e){
    if(this.state.user.username !== this.state.username){
      if(this.state.user.username === "Guest"){
        this._resetUsername();
        alert("Guests can't change their username. \n\nOnly real users get fancy features like that.");
        return;
      }
      if(!confirm("Are you sure you want to change your username? It's a big decision...")){
        this._resetUsername();
        return;
      }
    }
    ApiUtil.updateUser({username: this.state.username, id: this.state.user.id, description: this.state.description});
    this.history.pushState(null, "/profile");
  },


  render: function () {
    var username = "";
    if(this.state.user){
      username = this.state.user.username;
    }
    return(
      <form className="editProfile" onSubmit={this.updateProfile}>
        <h2>Edit Profile</h2>
        <label onClick={this.showUsername}>Username:<br/>
          {this.state.showUsername ? <input valueLink={this.linkState('username')}
            type="text" defaultValue={username}></input> : username}
        </label>
        <br/>
        <br/>

        <label onClick={this.showDescription}>Description:<br/>
          {this.state.showDescription ? <textarea valueLink={this.linkState('description')}
            >{this.state.description}</textarea> : this.state.description}
        </label>
        <br/>

        <br/>
        <input type="submit"></input>
      </form>
    );
  }
});
