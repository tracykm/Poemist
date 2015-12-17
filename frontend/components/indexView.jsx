var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil.js');
var PoemStore = require('../stores/poemStore.js');
var Poem = require('./poem');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  getInitialState: function () {
    return { poems: []};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getAllPoems();
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.all()})
  },
  render: function () {
    var poems = this.state.poems;

    return(
      <div className="index">
        <h2>Index</h2>
        <button onClick={this.goTo.bind(this, "/create")}>Create</button>
        <button onClick={this.goTo.bind(this, "/profile")}>Profile</button>
        <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
