var React = require('react');
var History = require('react-router').History;
var Poem = require('../singlePoem/poem.jsx');
var LodaingPoems = require('./loadingPoems');

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
  },
  componentWillReceiveProps: function(newProps){
    // on change page, handleLoadClick needs update for calling diff parents
    // bug fix from "set state un unmounted componet" warning
    if(this.props.parent !== newProps.parent){
      var that = this;
      document.addEventListener('scroll', function (event) {
      if (document.body.scrollHeight ==
          document.body.scrollTop + window.innerHeight) {
          that.handleLoadClick();
        }
      });
    }
    var ul = document.querySelector(".poemDisplay ul");
  },
  componentDidUpdate: function(){
    this.fadeIn();
  },
  handleLoadClick: function(){
    // debugger
    // if(this.props.morePoems){
    this.props.loadNextPage();
    // }
  },
  fadeIn: function(){
    var ul = document.querySelector(".poemDisplay ul");
    if(!ul){
      return;
    }
    function fadeInLi(i){
      if (i < ul.childNodes.length) {
        var li = ul.childNodes[i];
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
    var loadClasses = "clear-fix ";

    // loadClasses += this.props.morePoems ? "" : "hidden";
    return(
      <div className="poemDisplay">
        <ul>
        <li className="newPeomAdded">
          <div onClick={this.goTo.bind(this, "new/create")}
            className="sinlgePoem link createBtn">
            <span className="plus"><i className="icon-plus"></i></span>
            <br/>Create a Poem
            </div>
          </li>
        {poemsList}
      </ul>
        <div className={loadClasses}>
          <LodaingPoems />
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
