var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  goToUserProfile(){
    window.scrollTo(0,0);
    this.history.pushState(null, "/user/"+this.props.user.id);
  },
  render: function () {
    return(
      <span className="username link" onClick={this.goToUserProfile}>
        {this.props.user.username}
      </span>
    );
  }
});
