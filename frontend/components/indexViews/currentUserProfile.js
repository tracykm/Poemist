var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <h2>Your Poems</h2>
        <UserProfile user_id = {window.current_user.id}/>
      </div>
    );
  }
});
