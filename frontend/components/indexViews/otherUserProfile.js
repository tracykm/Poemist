var React = require('react');
var UserProfile = require('./userProfile');

module.exports = React.createClass({

  render: function () {
    var id = this.props.params.user_id;
    return(
      <div>
        <UserProfile user_id={id} currentUser={this.props.currentUser}/>
      </div>
    );
  }
});
