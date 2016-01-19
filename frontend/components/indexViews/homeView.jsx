var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var ApiActions = require('../../actions/apiActions.js');
var PoemStore = require('../../stores/poemStore.js');
var Poem = require('../singlePoem/poem.jsx');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  getInitialState: function () {
    return { poems: PoemStore.all(), page: 1, areMorePoems: true};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    this.loadNextPage();
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    var updatedPeomsList = PoemStore.all();
    this.setState({poems: updatedPeomsList, areMorePoems: PoemStore.areMorePoems() });
  },
  loadNextPage: function (){
    // Home view
    ApiUtil.getAllPoems(this.state.page);
    this.setState({page: this.state.page+1});
  },
  render: function () {
    return(
      <div className="index">
        <h2 className="transperent">.</h2>
        <PoemsDisplay poems={this.state.poems}
          currentUser={this.props.currentUser}
          loadNextPage={this.loadNextPage}
          areMorePoems={this.state.areMorePoems}
          parent="homeView"
          toggleShowLogin={this.props.toggleShowLogin}/>
      </div>
    );
  }
});
