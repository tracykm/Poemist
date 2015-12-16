var React = require('react');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <div>
          App component
        </div>
        {this.props.children}
      </div>
    );
  }
});
