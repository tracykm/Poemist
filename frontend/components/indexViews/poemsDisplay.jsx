var React = require('react');
var History = require('react-router').History;
var Poem = require('../poem');

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return ({clickable: true});
  },
  goTo: function(url){
    this.history.pushState(null, url);
  },
  poemsInHtml: function(poems){
    var poemsLis = poems.map(function(poem, idx){
      return (<li key={poem.id}>
        <Poem poem={poem} currentUser={this.props.currentUser}/>
        </li>);
    }.bind(this));
    return poemsLis;

  },
  componentWillReceiveProps: function(newProps){
    if(newProps.poems !== this.props.poems){
      this.setState({clickable: true});
    }
  },
  handleLoadClick: function(){
    this.props.loadNextPage();
    this.setState({clickable: false});
  },

  render: function () {
    var poemsList = this.poemsInHtml(this.props.poems);

    return(
      <div className="poemDisplay">
        <ul>
        <li>
          <div onClick={this.goTo.bind(this, "new/create")}
            className="sinlgePoem link createBtn">
            <span className="plus">➕</span>
            <br/>Create a Poem
            </div>
          </li>
        {poemsList}</ul>
      <div className={this.state.clickable ? "link clear-fix" : "clear-fix"} onClick={this.handleLoadClick}>Load next page</div>
      </div>
    );
  }
});
