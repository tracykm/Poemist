var React = require('react');
var History = require('react-router').History;
var myMixables = require('../../util/myMixables');
var LikeStore = require('../../stores/likeStore.js');
var Username = require('./username');
var PoemLink = require('./poemLink');

module.exports = React.createClass({
  mixins: [History, require('react-onclickoutside')],
  getInitialState: function(){
    return ({recentLikes: LikeStore.recentLikes()});
  },
  _formatNotifications: function(likes){
    var that = this;
    if(likes.length === 0){
      return <div>No recent notifications</div>
    }
    return likes.map(function(like, idx){
      var user = {id: like.liker_id, username: like.liker};
      var timeago = myMixables.timeSince(like.created_at);
      var classNames = "";
      if( that.props.highlightedLikes.indexOf(like.id.toString()) !== -1 ){
        classNames = "newLike";
      }
      return (
      <div key={idx} className={classNames}>
        <span><Username user={user}/></span> ❤
        <span><PoemLink poem_id={like.poem_id} text=" your poem"/></span>
        <span> {timeago} ago</span>
      </div>);
    });
  },
  handleClickOutside: function(e) {
    if(!e.target.parentElement.classList.contains("notifications")){
      this.props.shutDropDown();
    }
  },
  render: function () {
    var likeSpans = this._formatNotifications(this.state.recentLikes);

    return(
      <div className={this.props.shown ? "dropDown notifications" : "dropDown notifications hidden"}>
        {likeSpans}
      </div>
    );
  }
});
