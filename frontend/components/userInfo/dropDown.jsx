var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var LikeStore = require('../../stores/likeStore.js');
var Username = require('./username');
var PoemLink = require('./poemLink');
var myMixables = require('../../util/myMixables');

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
  goTo: function(url){
    this.history.pushState(null, url);
  },
  _logout: function(){
    ApiUtil.logout();
    location.reload();
  },
  _formatNotifications: function(likes){
    return likes.map(function(like, idx){
      var user = {id: like.liker_id, username: like.liker};
      var timeago = myMixables.timeSince(like.created_at);
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
        <div className="link logout" onClick={this.goTo.bind(this, "/profile/edit")}>account settings</div>
        <div className="link logout" onClick={this._logout}>logout</div>
      </div>
    );
  }
});
