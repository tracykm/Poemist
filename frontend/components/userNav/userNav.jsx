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
    debugger;
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
    ApiUtil.markLikesSeen(this.state.newLikes);
  },

  render: function () {
    var toggleBtn = (this.state.show_drop_down ? "▴" : "▾" );
    debugger;
    return(
      <div className="userInfo userNav">
          <CurrentUserLink currentUser={this.props.currentUser}/>
          <span className="notifications subtleLink" onClick={this._toggleNotifications}> * {this.state.newLikes.length} </span>
          <span className="settingsDropDown subtleLink" onClick={this._toggleDropDown}>{toggleBtn}</span>
          { this.state.show_drop_down ? <DropDown shutDropDown={this._shutDropDown} /> : null }
          { this.state.show_notifications ? <Notifications highlightedLikes={this.state.highlightedLikes} shutDropDown={this._shutDropDown}/> : null }
      </div>
    );
  }
});
