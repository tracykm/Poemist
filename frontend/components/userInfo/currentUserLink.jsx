var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  render: function () {
    return(
      <span className="username" onClick={this.goTo.bind(this, "/profile")}>
        Hi <span className="name">{window.current_user.username}!</span>
      </span>
    );
  }
});
