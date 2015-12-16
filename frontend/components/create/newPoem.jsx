var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');

module.exports = React.createClass({
  getInitialState: function () {
    return { passage: "loading passage..." };
  },

  componentDidMount: function () {
    BookStore.addListener(this._updatePassage);
    ApiUtil.getNewPassage();
  },

  _updatePassage: function () {
    this.setState({ passage: BookStore.all() });
  },

  render: function () {
    var pass = this.state.passage.text
    return(
      <div className="newPoem">
        NewPoem: {pass}
      </div>
    );
  }
});
