var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    console.log("User Profile "+this.props.currentUser);
    return(
      <div>
        <h2>Your Profile</h2>
        <UserProfile user_id = {window.current_user.id}/>
      </div>
    );
  }
});
