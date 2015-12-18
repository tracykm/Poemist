var React = require('react');
var History = require('react-router').History;
var Poem = require('./poem');

module.exports = React.createClass({
  mixins: [History],
  poemsInHtml: function(poems){
    var poemsArr = Object.keys(poems).map(function(key){return poems[key]})
    poemsArr = poemsArr.reverse()
    var poemsLis = poemsArr.map(function(poem, idx){
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
