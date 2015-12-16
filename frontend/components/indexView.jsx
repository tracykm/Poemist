var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil.js');
var PoemStore = require('../stores/poemStore.js');

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return { poems: []};
  },
  goToCreate: function(){
    this.history.pushState(null, "/create");
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
    var poemsUl = poems.map(function(poem, idx){
      return <li key={idx}>poem: {poem["id"]}  author:{poem["author_id"]} </li>
    });
    console.log(poemsUl);
    return(
      <div className="index">
        <h4>You are at the Index</h4>
        <button onClick={this.goToCreate}>Create Poem</button>
        <ul>{poemsUl}</ul>
      </div>
    );
  }
});
