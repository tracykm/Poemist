var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    var user = this.props.currentUser;

    return(
      <div>
        <h2>Your Profile</h2>
        <UserProfile user_id = {user ? user.id : undefined} currentUser = {this.props.currentUser}/>
      </div>
    );
  }
});
