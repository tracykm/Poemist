var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        current_user profile
        <UserProfile user_id = {current_user.id}/>
      </div>
    );
  }
});
