var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var LikeStore = require('../../stores/likeStore.js');
var Username = require('./username');
var PoemLink = require('./poemLink');

module.exports = React.createClass({
  mixins: [History, require('react-onclickoutside')],
  getInitialState: function(){
    return ({recentLikes: LikeStore.recentLikes()});
  },
  componentDidMount: function(){
    ApiUtil.getMyPoemLikes();
    this.likesListener = LikeStore.addListener(this._getNotifications);
  },
  componentWillUnmount: function(){
    this.likesListener.remove();
  },
  _getNotifications: function(){
    this.setState({recentLikes: LikeStore.recentLikes()});
  },
  handleClickOutside: function(e) {
    if(!e.toElement.classList.contains("notifications")){
      this.props.shutDropDown();
    }
  },
  _logout: function(){
    ApiUtil.logout();
    location.reload();
  },
  _formatNotifications: function(likes){
    return likes.map(function(like, idx){
      var user = {id: like.liker_id, username: like.liker};
      var created_at = new Date(like.created_at);
      var timeago = timeSince(created_at)
      return (
      <div key={idx}>
        <span><Username user={user}/></span> ❤
        <span><PoemLink poem_id={like.poem_id} text=" your poem"/></span>
        <span> {timeago} ago</span>
      </div>);
    });
  },
  render: function () {
    var notifications = this._formatNotifications(this.state.recentLikes);
    return(
      <div className="dropDown likeNotfications">
        {notifications}
        <div className="link logout" onClick={this._logout}>logout</div>
      </div>
    );
  }
});

function timeSince(date, date2) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 0) {
      return timeAgo(interval, "years")
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 0) {
      return timeAgo(interval, "months")
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 0) {
      return timeAgo(interval, "days")
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 0) {
      return timeAgo(interval, "hours")
    }
    interval = Math.floor(seconds / 60);
    if (interval > 0) {
      return timeAgo(interval, "minutes")
    }
    return Math.floor(seconds) + " seconds";
}

function timeAgo(interval, timeWord){
  var timeAgo = interval + " " + timeWord;
    if(interval === 1){
      timeAgo = timeAgo.slice(0, -1);
    }
    return timeAgo;
  }
