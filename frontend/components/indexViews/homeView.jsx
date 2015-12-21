var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var Poem = require('../poem');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  getInitialState: function () {
    return { poems: PoemStore.all()};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getAllPoems();
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.all()});
  },
  render: function () {
    var poems = this.state.poems;
    console.log("poems", poems);

    return(
      <div className="index">
        <h2>Index</h2>
        <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
