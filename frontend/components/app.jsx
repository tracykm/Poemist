var React = require('react');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <div className="app">
        </div>
        {this.props.children}
      </div>
    );
  }
});
