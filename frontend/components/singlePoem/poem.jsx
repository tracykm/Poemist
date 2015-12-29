var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var DropDown = require('.././userNav/dropDown');
var PoemFooter = require('./poemFooter');
var PoemTop = require('./poemTop');

module.exports = React.createClass({
  addHighlightSpans: function(pass){
    var selects = [].concat.apply([], this.props.poem.selected_texts);
    var i = 0;
    var nextChangeIdx;
    if(selects.length !== 0){
      nextChangeIdx = selects[0];
    }
    var selected = false;
    debugger

    var highlightedText = pass.split("").map(function(ch, idx){
      if(nextChangeIdx == idx){
        selected = selected ? false : true;
        i++;
        nextChangeIdx = selects[i];
      }
      var selectClass = selected ? "selected" : "";
      return (<span className={selectClass} key={idx} data-idx={idx}>{ch}</span>);
    });
    debugger
    return highlightedText;
  },

  inCreateView: function(){
    // highly breakable if div nesting or class change
    return this.props.className === "newPoem";
  },


  render: function () {
    var poem = this.props.poem;

    var classes = "";
    classes += poem.centered ? 'centered' : ' '+ classes;
    classes += " sinlgePoem noSelect style" + this.props.poem.color_range;

    var pass = this.props.poem.passage;
    pass = this.addHighlightSpans(pass);

    return(
      <div className={classes}>
        <PoemTop poem={poem} />
        <div className="poemText ">
          {pass}
        </div>
        <PoemFooter poem={poem} inCreateView={this.inCreateView()} currentUser={this.props.currentUser}/>
      </div>
    );
  }

});
