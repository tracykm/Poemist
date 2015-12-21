var React = require('react');
var UserNav = require('./userInfo/userNav');
var Header = require('./header');

module.exports = React.createClass({

  render: function () {
    return(
      <div className="app">
        <UserNav/>
        <Header/>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
});
