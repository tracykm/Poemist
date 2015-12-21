var React = require('react');
var History = require('react-router').History;
var Poem = require('../poem');

module.exports = React.createClass({
  mixins: [History],
  poemsInHtml: function(poems){
    poems = poems.reverse()
    var poemsLis = poems.map(function(poem, idx){
      return <li key={poem.id}>
        <Poem poem={poem}/>
        </li>
    });
    return poemsLis

  },
  render: function () {
    debugger
    var poemsList = this.poemsInHtml(this.props.poems)

    return(
      <div className="poemDisplay">
        <ul>{poemsList}</ul>
      </div>
    );
  }
});
