var React = require('react');
var CurrentUserLink = require('./currentUserLink');
var DropDown = require('./dropDown');

module.exports = React.createClass({
  getInitialState: function () {
    return { show_drop_down: false};
  },

  _toggleDropDown: function () {
    this.setState({ show_drop_down: !this.state.show_drop_down})
  },

  render: function () {
    return(
      <div className="userInfo userNav">
          <CurrentUserLink/> <span className="notifications" onClick={this._toggleDropDown}>></span>
          { this.state.show_drop_down ? <DropDown shutDropDown={this._toggleDropDown} /> : null }
      </div>
    );
  }
});
