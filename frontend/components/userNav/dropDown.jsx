var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var myMixables = require('../../util/myMixables');

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  _logout: function(){
    ApiUtil.logout();
    this.goTo("/");
  },
  render: function () {
    return(
      <div className={this.props.shown ? "settings dropDown " : "settings dropDown hidden"}>
        <div className="link logout" onClick={this.goTo.bind(this, "/profile/edit")}>account settings</div>
        <div className="link logout" onClick={this._logout}>log out</div>
      </div>
    );
  }
});
