var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../util/apiUtil');
var UserStore = require('../stores/userStore');
var History = require('react-router').History;
const { connect } = require('react-redux');

const EditProfile = React.createClass({
  mixins: [LinkedStateMixin, History],
  getInitialState: function(){
    return ({showUsername: true, showDescription: true, user: this.props.current_user});
  },
  showUsername: function(){
    this.setState({showUsername: true});
  },
  showDescription: function(){
    this.setState({showDescription: true});
  },
  _resetUsername: function(){
    this.setState({username: this.props.currentUser.username});
  },
  updateProfile: function(e){
    if(this.props.currentUser.username !== this.props.currentUsername){
      if(this.props.currentUser.username === "Guest"){
        this._resetUsername();
        alert("Guests can't change their username. \n\nOnly real users get fancy features like that.");
        return;
      }
      if(!confirm("Are you sure you want to change your username? It's a big decision...")){
        this._resetUsername();
        return;
      }
    }
    ApiUtil.updateUser({username: this.props.currentUsername, id: this.props.currentUser.id, description: this.state.description});
    this.history.pushState(null, "/profile");
  },


  render: function () {
    var username = "";
    if(this.props.currentUser){
      username = this.props.currentUser.username;
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

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

module.exports = connect(mapStateToProps)(EditProfile);
