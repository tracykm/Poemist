var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var Poem = require('../poem');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  getInitialState: function () {
    return { poems: PoemStore.all(), page: 1};
  },
  componentDidMount: function () {
    this.loadNextPage();
    this.poemListener = PoemStore.addListener(this._updatePoems);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.all()});
  },
  loadNextPage: function (){
    ApiUtil.getAllPoems(this.state.page);
    this.setState({page: this.state.page+1 });
    console.log("this.state.page",this.state.page);
  },
  render: function () {
    var poems = this.state.poems;
    return(
      <div className="index">
        <h2>Index</h2>
        <PoemsDisplay poems={poems} currentUser={this.props.currentUser} loadNextPage={this.loadNextPage}/>
      </div>
    );
  }
});
