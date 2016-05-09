var React = require('react');
var CurrentUserLink = require('./currentUserLink');
var DropDown = require('./dropDown');
var LikeStore = require('../../stores/likeStore');
var ApiUtil = require('../../util/apiUtil');
var Notifications = require('./notifications');

module.exports = React.createClass({
  mixins: [require('react-onclickoutside')],
  getInitialState: function () {
    return { show_drop_down: false, show_notifications: false, newLikes: [], highlightedLikes: [] };
  },

  componentDidMount: function () {
    this.likeListener = LikeStore.addListener(this._updateNewLikes);
  },

  componentWillUnmount: function () {
    this.likeListener.remove();
  },

  _updateNewLikes: function () {
    var highlightedLikes = this.state.newLikes;
    this.setState({highlightedLikes: highlightedLikes, newLikes: LikeStore.newLikes()});
  },

  _toggleDropDown: function () {
    this._shutNotifications();
    this.setState({ show_drop_down: !this.state.show_drop_down});
  },

  _toggleNotifications: function () {
    this._shutDropDown();
    if(this.state.show_notifications){
      this._shutNotifications();
    }else{
      this._showNotifications();
    }
  },

  _shutNotifications: function () {
    if(this.state.show_notifications){
      this.setState({highlightedLikes: []});
    }
    this.setState({ show_notifications: false});
  },

  _shutDropDown: function () {
    if(this.state.show_notifications){
      this.setState({highlightedLikes: []});
    }
    this.setState({ show_drop_down: false });
  },

  _showNotifications: function () {
    this.setState({ show_notifications: true});
    if(this.state.newLikes.length > 0){
      ApiUtil.markLikesSeen(this.state.newLikes);
    }
  },

  _showLogin: function(){
    this.props.toggleShowLogin({showSignUp: false});
    this.setState({ show_drop_down: false});
  },

  _showSignUp: function(){
    this.props.toggleShowLogin({showSignUp: true});
    this.setState({ show_drop_down: false});
  },

  handleClickOutside: function(e) {
    this._shutNotifications();
    this._shutDropDown();
  },

  render: function () {
    var toggleBtn = (this.state.show_drop_down ? "▴" : "▾" );

    var hasNotifications = false;
    if(this.state.newLikes.length){
      hasNotifications = true;
    }
    var userNav;
    if(this.props.currentUser){
      userNav = (
        <div>
          <span className="navSection">
            <CurrentUserLink currentUser={this.props.currentUser}/>
          </span>
          <span className="navSection">
            <span className={hasNotifications ? "notifications subtleLink hasNotifications" : "notifications subtleLink "}
              onClick={this._toggleNotifications}> <span className="dot"> {this.state.newLikes.length} </span> </span>
          </span>
          <span className="navSection">
            <span className="settingsDropDown subtleLink" onClick={this._toggleDropDown}>{toggleBtn}</span>
          </span>
          <DropDown
            shown={this.state.show_drop_down}
          />
          <Notifications
            highlightedLikes={this.state.highlightedLikes}
            shown={this.state.show_notifications}
          />
        </div>
      );
    }else{
      userNav = (
        <div>
          <span className="link" onClick={this._showSignUp}>
            Sign Up
          </span>
          <span> / </span>
          <span className="link" onClick={this._showLogin}>
            Log In
          </span>

        </div>);
    }

    return(
      <div className="userInfo userNav unselectable">
        {userNav}
      </div>
    );
  }
});
