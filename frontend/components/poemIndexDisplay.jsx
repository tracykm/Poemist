var React = require('react');
var History = require('react-router').History;
var Poem = require('./poem');

module.exports = React.createClass({
  mixins: [History],
  render: function () {
    var poems = this.props.poems;
    var poemsUl = poems.map(function(poem, idx){

      var selected_texts = poem.selected_texts
    // if(typeof selected_texts === Array)
    debugger
      console.log(selected_texts);
      selected_texts = selected_texts.map(function(select){ return [select.start_idx, select.end_idx] } );
      selected_texts = [].concat.apply([], selected_texts);
      poem.selected_texts = selected_texts;

      return <div key={poem.id}> <Poem poem={poem}/> </div>
    });

    // AKA: Maybe separate this stuff into a helper

    return(
      <div className="poemDisplay">
        <ul>{poemsUl}</ul>
      </div>
    );
  }
});
