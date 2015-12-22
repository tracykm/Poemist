var React = require('react');
var CurrentUserLink = require('./currentUserLink');
var DropDown = require('./dropDown');

module.exports = React.createClass({
  getInitialState: function () {
    return { show_drop_down: false};
  },

  _toggleDropDown: function () {
    this.setState({ show_drop_down: !this.state.show_drop_down});
  },

  _shutDropDown: function () {
    this.setState({ show_drop_down: false});
  },

  render: function () {
    var toggleBtn = (this.state.show_drop_down ? "▴" : "▾" );
    return(
      <div className="userInfo userNav">
          <CurrentUserLink currentUser={this.props.currentUser}/>
          <span className="notifications subtleLink" onClick={this._toggleDropDown}>{toggleBtn}</span>
          { this.state.show_drop_down ? <DropDown shutDropDown={this._shutDropDown} /> : null }
      </div>
    );
  }
});
