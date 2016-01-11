var React = require('react');

module.exports = React.createClass({
  render: function () {
    return(
        <div className="spinner loading">
          loading
          <br/>
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
    );
  }
});
