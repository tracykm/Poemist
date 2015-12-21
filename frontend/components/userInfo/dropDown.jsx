var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');

module.exports = React.createClass({
  mixins: [History, require('react-onclickoutside')],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  handleClickOutside: function(evt) {
    this.props.shutDropDown()
  },
  _logout: function(){
    ApiUtil.logout();
    location.reload();
  },
  render: function () {
    return(
      <div className="dropDown">
        dropdown
        <div className="link" onClick={this._logout}>logout</div>
      </div>
    );
  }
});
