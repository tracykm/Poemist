var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var myMixables = require('../../util/myMixables');

module.exports = React.createClass({
  mixins: [History, require('react-onclickoutside')],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  _logout: function(){
    ApiUtil.logout();
    this.goTo("/");
  },
  handleClickOutside: function(e) {
    if(!e.target.classList.contains("settingsDropDown")){
      this.props.shutDropDown();
    }
  },
  render: function () {
    return(
      <div className="dropDown likeNotfications">
        <div className="link logout" onClick={this.goTo.bind(this, "/profile/edit")}>account settings</div>
        <div className="link logout" onClick={this._logout}>log out</div>
      </div>
    );
  }
});
