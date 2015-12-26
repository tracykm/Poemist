var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var Poem = require('../poem');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  getInitialState: function () {
    return { poems: PoemStore.all(), page: 1, morePoems: true};
  },
  componentDidMount: function () {
    this.loadNextPage();
    this.poemListener = PoemStore.addListener(this._updatePoems);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    var updatedPeomsList = PoemStore.all();
    if(this.state.poems.length === updatedPeomsList.length){
      this.setState({morePoems: false});
    }else{
      this.setState({poems: updatedPeomsList});
    }
  },
  loadNextPage: function (){
    ApiUtil.getAllPoems(this.state.page);
    this.setState({page: this.state.page+1 });
  },
  render: function () {
    var poems = this.state.poems;
    return(
      <div className="index">
        <h2>Index</h2>
        <PoemsDisplay poems={poems} currentUser={this.props.currentUser}
          loadNextPage={this.loadNextPage} morePoems={this.state.morePoems}/>
      </div>
    );
  }
});
