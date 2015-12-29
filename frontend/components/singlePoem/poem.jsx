var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var DropDown = require('.././userNav/dropDown');
var PoemFooter = require('./poemFooter');
var PoemTop = require('./poemTop');

module.exports = React.createClass({
  addHighlightSpans: function(pass){
    var selects = [].concat.apply([], this.props.poem.selected_texts);
    var lastIdx = 0;
    var spans = [];
    for (var i = 0; i < selects.length; i += 2) {
      spans.push(pass.substring(lastIdx, selects[i]));
      spans.push(pass.substring(selects[i], selects[i+1]));
      lastIdx = selects[i+1];
    }
    // add the rest of the passage
    spans.push(pass.substring(selects[selects.length]));
    var selected = true;
    spans = spans.map(function(spanText, idx){
      selected = !selected;
      return (
      <span key={idx}
        className={selected ? "selected" : ""}>
        {spanText}
      </span>
      );
    });
    return spans;
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