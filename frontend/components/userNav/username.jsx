var React = require('react');
var History = require('react-router').History;
var current_user = window.current_user;

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  render: function () {
    return(
      <div>
        <div className="username" onClick={this.goTo.bind(this, "/profile")}>
          Hi <span className="name">{current_user.username}!</span>
        </div>
      </div>
    );
  }
});
