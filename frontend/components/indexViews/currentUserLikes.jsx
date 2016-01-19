var React = require('react');
var LikesView = require('./likesView');

module.exports = React.createClass({
  render: function () {
    var user = this.props.currentUser;
    return(
      <div className="myLikes">
        <LikesView
          user_id = {user ? user.id : undefined}
          currentUser={this.props.currentUser}
          toggleShowLogin={this.props.toggleShowLogin}/>
      </div>
    );
  }
});
