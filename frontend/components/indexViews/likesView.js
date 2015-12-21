var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var Poem = require('../poem');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  getInitialState: function () {
    return { poems: PoemStore.allLiked(current_user.id)};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getLikedPoems(current_user.id);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.allLiked(current_user.id)})
  },
  render: function () {
    var poems = this.state.poems;

    return(
      <div className="index">
        <h2>Poems You've Liked</h2>
        <button onClick={this.goTo.bind(this, "new/create")}>Create</button>
        <button onClick={this.goTo.bind(this, "/profile")}>Profile</button>
        <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
