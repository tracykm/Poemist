var React = require('react');
var UserNav = require('./userInfo/userNav');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
          <UserNav/>
        <div className="app">
        </div>
        {this.props.children}
      </div>
    );
  }
});
