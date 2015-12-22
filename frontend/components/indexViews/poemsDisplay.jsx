var React = require('react');
var History = require('react-router').History;
var Poem = require('../poem');

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  poemsInHtml: function(poems){
    var poemsLis = poems.map(function(poem, idx){
      return (<li key={poem.id}>
        <Poem poem={poem}/>
        </li>);
    });
    return poemsLis;

  },
  render: function () {
    var poemsList = this.poemsInHtml(this.props.poems);

    return(
      <div className="poemDisplay">
        <ul>
        <li>
          <div onClick={this.goTo.bind(this, "new/create")}
            className="sinlgePoem link createBtn">
            <span className="plus">⊕</span>
            <br/>Create A Poem
            </div>
          </li>
        {poemsList}</ul>
      </div>
    );
  }
});
