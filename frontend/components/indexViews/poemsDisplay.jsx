var React = require('react');
var History = require('react-router').History;
var Poem = require('../poem');

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return ({clickable: true, numPoems: 0});
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
  componentDidMount: function(){
    var that = this;
    document.addEventListener('scroll', function (event) {
    if (document.body.scrollHeight ==
        document.body.scrollTop + window.innerHeight) {
        that.handleLoadClick();
      }
    });
  },
  componentWillReceiveProps: function(newProps){
    console.log("newProps",newProps);
    if(newProps.poems){
      if(newProps.poems.length === this.state.numPoems){
        console.log("OUT");
      }
      console.log("this.state.clickable",this.state.clickable);
      this.setState({numPoems: this.props.poems.length});
    }
  },
  handleLoadClick: function(){
    this.props.loadNextPage();
    console.log("this.state.clickable",this.state.clickable);
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
      <div className={this.state.clickable ? "link clear-fix" : "clear-fix"} >Load next page</div>
      </div>
    );
  }
});
