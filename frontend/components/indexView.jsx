var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../util/apiUtil.js');
var PoemStore = require('../stores/poemStore.js');
var Poem = require('./poem');

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
      var selectedTexts = poem.selected_texts
      debugger
      selectedTexts = selectedTexts.map(function(select){ return [select.start_idx, select.end_idx] } );
      selectedTexts = [].concat.apply([], selectedTexts);
      return <div className="newPoem" key={idx}> <Poem className="newPoem" passage={poem.passage} selectedTexts={selectedTexts}/> </div>
    });
    console.log("POEMS", poems);
    return(
      <div className="index">
        <h4>You are at the Index</h4>
        <button onClick={this.goToCreate}>Create Poem</button>
        <ul>{poemsUl}</ul>
      </div>
    );
  }
});
