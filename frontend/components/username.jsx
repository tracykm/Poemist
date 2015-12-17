var React = require('react');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <div className="username">
          {current_user.username}
        </div>
      </div>
    );
  }
});
