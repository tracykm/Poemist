var React = require('react');
var NewPoem = require('./newPoem');

module.exports = React.createClass({

  render: function () {
    return(
      <div className="createView">
        Create Views
        <NewPoem/>
        <div className="toolbar">
          {this.props.children}
        </div>
      </div>
    );
  }
});
