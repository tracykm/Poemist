var React = require('react');
var History = require('react-router').History;
var Poem = require('../singlePoem/poem');
var LodaingPoems = require('./loadingPoems');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');


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
      return (<li key={poem.id} className="newPeomAdded">
        <Poem
          poem={poem}
          currentUser={this.props.currentUser}
          toggleShowLogin={this.props.toggleShowLogin}/>
        </li>);
    }.bind(this));
    return poemsLis;
  },
  handleResize: function(){
    setContainerWidth();
  },
  componentDidMount: function(){
    setContainerWidth();

    var that = this;
    document.addEventListener('scroll', this.handleScroll);
  },

  handleScroll: function(event){
    var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (document.documentElement.scrollHeight == bodyScrollTop + window.innerHeight) {
        this.loadMorePoems();
      }
  },

  componentWillUnmount: function(){
    document.removeEventListener('scroll', this.handleScroll);

  },
  componentWillReceiveProps: function(newProps){
    var ul = document.querySelector(".poemDisplay ul");
  },
  componentDidUpdate: function(){
    this.fadeIn();
  },
  loadMorePoems: function(){
    this.props.loadNextPage();
  },
  fadeIn: function(){
    var ul = $(".poemDisplay ul");
    if(!ul){
      return;
    }
    function fadeInLi(i){
      var poemLis = $(".poemDisplay li");
      if (i < poemLis.length) {
        var li = poemLis[i];
        if(li.className !== ""){
          li.className = "";
          setTimeout(function(){
            fadeInLi(i+1);
          }, 200);
        }else{
          fadeInLi(i+1);
        }
      }
    }
    fadeInLi(0);
  },
  render: function () {
    var poemsList = this.poemsInHtml(this.props.poems);
    return(
      <div className="poemDisplay">
        <ul>
          <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>

        <li className="" key={"createBtn"}>
          <div onClick={this.goTo.bind(this, "/new/create")}
            className="sinlgePoem link createBtn">
            <span className="plus"><i className="icon-plus"></i></span>
            <br/>Create a Poem
            </div>
            <div className="whatIs link" onClick={this.goTo.bind(this,"/about")}>
              What is a found poem?
            </div>
          </li>
        {poemsList}
          </ReactCSSTransitionGroup>
      </ul>
        <div className={"clear-fix " + (this.props.areMorePoems ? "link" : "disabled")} onClick={this.loadMorePoems}>
          {this.props.areMorePoems ? "Load More Poems" : "All Poems Loaded"}
        </div>
      </div>
    );
  }
});

function setContainerWidth()
{
    $('.poemDisplay ul').css('width', 'auto'); //reset
    var windowWidth = $(document).width()-100;
    var blockWidth = $('.sinlgePoem').outerWidth(true);
    var maxBoxPerRow = Math.floor(windowWidth / blockWidth);
    // debugger;
    $('.poemDisplay ul').width(maxBoxPerRow * blockWidth);
}

$(window).resize(function(){
   setContainerWidth();
});
