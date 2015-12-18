var React = require('react');
var CreateView = require('./createView');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <h2>Edit</h2>
          {React.cloneElement(this.props.children, { poemId: this.props.params.poemId})}
      </div>
    );
  }
});
