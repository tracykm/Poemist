var React = require('react');
var Username = require('./username');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
          <Username/>
        <div className="app">
        </div>
        {this.props.children}
      </div>
    );
  }
});
