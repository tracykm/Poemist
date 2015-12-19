var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    var id = this.props.params.user_id
    console.log("user id!", id);
    return(
      <div>
        <UserProfile user_id = {id}/>
      </div>
    );
  }
});
