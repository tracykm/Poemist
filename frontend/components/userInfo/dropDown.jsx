var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var LikeStore = require('../../stores/likeStore.js');
var Username = require('./username');
var PoemLink = require('./poemLink');

module.exports = React.createClass({
  mixins: [History, require('react-onclickoutside')],
  getInitialState: function(){
    return ({recentLikes: []})
  },
  componentDidMount: function(){
    ApiUtil.getMyPoemLikes();
    this.likesListener = LikeStore.addListener(this._getNotifications)
  },
  componentWillUnmount: function(){
    this.likesListener.remove();
  },
  _getNotifications: function(){
    this.setState({recentLikes: LikeStore.recentLikes()})
  },
  handleClickOutside: function(e) {
    if(e.toElement.className !== "notifications"){
      this.props.shutDropDown()
    }
  },
  _logout: function(){
    ApiUtil.logout();
    location.reload();
  },
  render: function () {
    var notifications = this.state.recentLikes.map(function(like, idx){
      var user = {id: like.liker_id, username: like.liker}
      return (
      <div key={idx}>
        <span><Username user={user}/></span> ❤
        <span><PoemLink poem_id={like.poem_id} text="your poem"/></span>
      </div>);
    })
    return(
      <div className="dropDown">
        {notifications}
        <div className="link" onClick={this._logout}>logout</div>
      </div>
    );
  }
});
