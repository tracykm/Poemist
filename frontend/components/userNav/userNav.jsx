var React = require('react');
var CurrentUserLink = require('./currentUserLink');
var DropDown = require('./dropDown');
var LikeStore = require('../../stores/likeStore');
var ApiUtil = require('../../util/apiUtil');
var Notifications = require('./notifications');

module.exports = React.createClass({
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
    this.setState({ show_drop_down: !this.state.show_drop_down});
  },

  _toggleNotifications: function () {
    if(this.state.show_notifications){
      this._shutDropDown();
    }else{
      this._showNotifications();
    }
  },

  _shutDropDown: function () {
    if(this.state.show_notifications){
      this.setState({highlightedLikes: []});
    }
    this.setState({ show_drop_down: false, show_notifications: false});
  },

  _showNotifications: function () {
    this.setState({ show_notifications: true});
    if(this.state.newLikes.length > 0){
      ApiUtil.markLikesSeen(this.state.newLikes);
    }
  },

  render: function () {
    var toggleBtn = (this.state.show_drop_down ? "▴" : "▾" );

    var hasNotifications = false;
    if(this.state.newLikes.length){
      hasNotifications = true;
    }
    var userNav;
    if(this.props.currentUser){
      var userNav = (
        <div>
          <CurrentUserLink currentUser={this.props.currentUser}/>
          <span className={hasNotifications ? "notifications subtleLink hasNotifications" : "notifications subtleLink "}
            onClick={this._toggleNotifications}> {this.state.newLikes.length} </span>
          <span className="settingsDropDown subtleLink" onClick={this._toggleDropDown}>{toggleBtn}</span>
          { this.state.show_drop_down ? <DropDown shutDropDown={this._shutDropDown} /> : null }
          { this.state.show_notifications ? <Notifications highlightedLikes={this.state.highlightedLikes} shutDropDown={this._shutDropDown}/> : null }
        </div>
      );
    }else{
      userNav = <div className="link" onClick={this.props.toggleShowLogin}>Sign In</div>;
    }

    return(
      <div className="userInfo userNav">
        {userNav}
      </div>
    );
  }
});
