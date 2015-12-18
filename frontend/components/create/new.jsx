var React = require('react');
var CreateView = require('./createView');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
        <h2>New</h2>
          {React.cloneElement(this.props.children, { poemId: -1})}
      </div>
    );
  }
});
