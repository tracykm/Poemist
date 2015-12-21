var React = require('react');
var Username = require('./username');

module.exports = React.createClass({

  render: function () {
    return(
      <div className="userNav">
          <Username/>
      </div>
    );
  }
});
