var React = require('react');
var LikesView = require('./likesView');

module.exports = React.createClass({
  render: function () {
    return(
      <div className="myLikes">
        <LikesView user_id = {this.props.params.user_id} currentUser={this.props.currentUser}/>
      </div>
    );
  }
});
