var React = require('react');
var UserNav = require('./userInfo/userNav');
var Header = require('./header');

module.exports = React.createClass({

  render: function () {
    return(
      <div>
          <UserNav/>
          <Header/>
        <div className="app">
        </div>
        {this.props.children}
      </div>
    );
  }
});
