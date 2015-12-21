var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var LikeStore = require('../../stores/likeStore.js');

module.exports = React.createClass({
  mixins: [History, require('react-onclickoutside')],
  goTo: function(url){
    this.history.pushState(null, url);
  },
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
  handleClickOutside: function(evt) {
    this.props.shutDropDown()
  },
  _logout: function(){
    ApiUtil.logout();
    location.reload();
  },
  render: function () {
    var notifications = this.state.recentLikes.map(function(like, idx){
      return <div key={idx}>{like.liker}</div>
    })
    return(
      <div className="dropDown">
        {notifications}
        <div className="link" onClick={this._logout}>logout</div>
      </div>
    );
  }
});
