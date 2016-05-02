var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var DropDown = require('.././userNav/dropDown');
var PoemFooter = require('./poemFooter');
var PoemTop = require('./poemTop');
var History = require('react-router').History;
var myMixables = require('../../util/myMixables');

module.exports = React.createClass({
  mixins: [History],
  addHighlightSpans: function(pass){
    var passage_length = this.props.poem.passage_length;
    if(!passage_length){
      passage_length = 1000;
    }
    pass = pass.substring(0, passage_length);
    var selects = [].concat.apply([], this.props.poem.selected_texts);
    selects = selects.sort(function(a,b) { return a - b; });

    var lastIdx = 0;
    var spans = [];
    for (var i = 0; i < selects.length; i += 2) {
      spans.push(pass.substring(lastIdx, selects[i]));
      spans.push(pass.substring(selects[i], selects[i+1]));
      lastIdx = selects[i+1];
    }
    // add the rest of the passage
    spans.push(pass.substring(selects[selects.length-1]));
    var selected = true;
    spans = spans.map(function(spanText, idx){
      selected = !selected;
      return (
      <span key={idx}
        className={selected ? "selected" : ""}>
        <span>{spanText}</span>
      </span>
      );
    });
    return spans;
  },

  like: function(e){
    var $poem = $(e.currentTarget).parent().parent();
    myMixables.likingPoem($poem)
  },

  inCreateView: function(){
    // highly breakable if div nesting or class change
    return this.props.className === "newPoem";
  },

  goToPoem: function(e){
    console.log("asdf");
    if(this.props.poem.id){
      this.history.pushState(null, "/poem/"+this.props.poem.id);
    }
  },
  toggleLike: function(){
    // console.log("like toggled");
  },

  render: function () {
    var poem = this.props.poem;

    var classes = "";
    classes += poem.centered ? 'centered' : ' '+ classes;
    classes += " sinlgePoem noSelect style" + this.props.poem.color_range;

    var pass = this.props.poem.passage;
    if(pass){
      pass = this.addHighlightSpans(pass);
    }else{
      pass = "loading...";
    }

    // console.log(this.props.poem.id + " poem: ", this.props.poem);

    var inPoemDisplay = (!this.props.inDetailView && !this.inCreateView());
    var poemText;
    if(inPoemDisplay){
      poemText = (
        <div className="poemText subtleLink" onClick={this.goToPoem}>
          {pass}
        </div>
      );
    }else{
      poemText = (
        <div className="poemText normalCursor" onDoubleClick={this.like}>
          {pass}
        </div>
      );
    }
    return(
      <div className={classes}>
        <div className={"backColor color" + this.props.poem.background_id}>
          <div className="backgroundImg"></div>
        </div>
        <PoemTop poem={poem} inDetailView={this.props.inDetailView} inCreateView={this.inCreateView()}/>
        <div className={"textColor color" + this.props.poem.background_id}>
          {poemText}
        </div>
        <PoemFooter
          poem={poem}
          inCreateView={this.inCreateView()}
          currentUser={this.props.currentUser}
          toggleShowLogin={this.props.toggleShowLogin}/>
      </div>
    );
  }

});
