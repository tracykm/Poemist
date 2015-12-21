var React = require('react');
var LikesView = require('./likesView');

module.exports = React.createClass({
  render: function () {
    var user_id = window.current_user_id;
    return(
      <div className="myLikes">
        <h2>My Likes</h2>
        <LikesView user_id={user_id} />
      </div>
    );
  }
});
