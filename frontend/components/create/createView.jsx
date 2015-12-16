var React = require('react');
var NewPoem = require('./newPoem');

module.exports = React.createClass({

  render: function () {
    return(
      <div className="createView">
        <h2>Create</h2>
        <NewPoem/>
        <div className="toolbar">
          {this.props.children}
        </div>
      </div>
    );
  }
});
