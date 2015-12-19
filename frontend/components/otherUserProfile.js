var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    var id = this.props.params.user_id
    return(
      <div>
        <h2>User {id}s Poems</h2>
        <UserProfile user_id = {id}/>
      </div>
    );
  }
});
