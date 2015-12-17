var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil.js');
var PoemStore = require('../stores/poemStore.js');
var Poem = require('./poem');
var PoemIndexDisplay = require('./poemIndexDisplay');

module.exports = React.createClass({
  mixins: [History],
  goToCreate: function(){
    this.history.pushState(null, "/create");
  },
  goToIndex: function(){
    this.history.pushState(null, "/");
  },
  getInitialState: function () {
    return { poems: []};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getCurrentUserPoems();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.all()})
  },
  render: function () {
    var poems = this.state.poems;
    return(
      <div className="userProfile">
        <h2>User Profile</h2>
        <button onClick={this.goToIndex}>Index</button>
        <button onClick={this.goToCreate}>Create</button>
        <PoemIndexDisplay poems={poems} />
      </div>
    );
  }
});
