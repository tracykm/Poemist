var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    var user = this.props.currentUser;

    return(
      <div>
        <UserProfile user_id = {user ? user.id : undefined} currentUser = {this.props.currentUser}/>
      </div>
    );
  }
});
