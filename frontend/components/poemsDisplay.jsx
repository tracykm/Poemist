var React = require('react');
var History = require('react-router').History;
var Poem = require('./poem');

module.exports = React.createClass({
  mixins: [History],
  poemsInHtml: function(poems){
    var poemsLis = poems.map(function(poem, idx){

      var selected_texts = poem.selected_texts

      console.log(selected_texts);
      selected_texts = selected_texts.map(function(select){ return [select.start_idx, select.end_idx] } );
      selected_texts = [].concat.apply([], selected_texts);
      poem.selected_texts = selected_texts;

      return <li key={poem.id}>
        <Poem poem={poem}/>
        </li>
    });
    return poemsLis

  },
  render: function () {
    var poemsList = this.poemsInHtml(this.props.poems)

    return(
      <div className="poemDisplay">
        <ul>{poemsList}</ul>
      </div>
    );
  }
});
