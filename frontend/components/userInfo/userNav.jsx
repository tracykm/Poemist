var React = require('react');
var Username = require('./username');

module.exports = React.createClass({

  render: function () {
    return(
      <div className="userInfo userNav">
          <Username/> <span className="notifications">-</span>
      </div>
    );
  }
});
