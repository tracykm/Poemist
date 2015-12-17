var React = require('react');
var CreateView = require('./createView');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <h2>New</h2>
        {this.props.children}
      </div>
    );
  }
});
