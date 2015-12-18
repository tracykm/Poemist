var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <UserProfile user_id = {current_user.id}/>
      </div>
    );
  }
});
