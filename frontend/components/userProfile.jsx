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
    return { poems: PoemStore.getByUserId(this.props.user_id)};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getUserPoems(this.props.user_id);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    this.setState({ poems: PoemStore.getByUserId(this.props.user_id)})
  },
  render: function () {
    var poems = this.state.poems;
    return(
      <div className="userProfile">
        <h2>User Profile</h2>
          <button onClick={this.goTo.bind(this, "new/create")}>Create</button>
          <button onClick={this.goTo.bind(this, "/")}>Index</button>
        <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
