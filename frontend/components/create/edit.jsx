var React = require('react');
var CreateView = require('./createView');

module.exports = React.createClass({
  render: function () {
    return(
      <div>
          {React.cloneElement(this.props.children, {
            new: false,
            currentUser: this.props.currentUser,
            toggleShowLogin: this.props.toggleShowLogin
          })}
      </div>
    );
  }
});
