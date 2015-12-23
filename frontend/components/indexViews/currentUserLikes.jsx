var React = require('react');
var LikesView = require('./likesView');

module.exports = React.createClass({
  render: function () {
    var user = this.props.currentUser;

    return(
      <div className="myLikes">
        <h2>My Likes</h2>
        <LikesView user_id = {user ? user.id : undefined} />
      </div>
    );
  }
});
