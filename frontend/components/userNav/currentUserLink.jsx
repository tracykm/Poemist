var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  render: function () {
    var username = this.props.currentUser.username;
    if(this.props.currentUser){
      username = this.props.currentUser.username;
    }

    return(
      <span className="username" onClick={this.goTo.bind(this, "/profile")}>
        Hi <span className="name">{username}!</span>
      </span>
    );
  }
});
