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
  goToProfile: function(){
    this.history.pushState(null, "/profile");
  },
  getInitialState: function () {
    return { poems: []};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getAllPoems();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.all()})
  },
  render: function () {
    var poems = this.state.poems;

    return(
      <div className="index">
        <h2>Index</h2>
        <button onClick={this.goToProfile}>Profile</button>
        <button onClick={this.goToCreate}>Create</button>
        <PoemIndexDisplay poems={poems} />
      </div>
    );
  }
});
