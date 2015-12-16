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
    ApiUtil.getCurrentUserPoems();
  },
  _updatePoems: function (){
    this.setState({poems: PoemStore.all()})
  },
  render: function () {
    var poems = this.state.poems;
    var poemsUl = poems.map(function(poem, idx){

      var selected_texts = poem.selected_texts
      selected_texts = selected_texts.map(function(select){ return [select.start_idx, select.end_idx] } );
      selected_texts = [].concat.apply([], selected_texts);
      poem.selected_texts = selected_texts;

      return <div key={idx}> <Poem poem={poem}/> </div>
    });

    // AKA: Maybe separate this stuff into a helper


    return(
      <div className="index">
        <h2>Profile</h2>
        <button onClick={this.goToCreate}>Create Poem</button>
        <ul>{poemsUl}</ul>
      </div>
    );
  }
});
