var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var DropDown = require('./userInfo/dropDown');
var PoemFooter = require('./poemFooter');
var PoemTop = require('./poemTop');

module.exports = React.createClass({
  formatLetters : function(letters){
    var poem = this.props.poem;
    var lettersArr = Object.keys(poem.letters).map(function(key){return poem.letters[key];});
    var poemLetters = lettersArr.map(function(letter, idx){
      // if(idx < poem.passage_length){
        var classes = "";
        if(letter.is_selected){
          classes = "selected";
        }
        var ch = letter.ch;
        return (<span className={classes} data-idx={idx} key={idx}>{letter.ch}</span>);
      // }
    });

    return poemLetters;
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


    return(
      <div className={classes}>
        <PoemTop poem={poem} />
        <div className="poemText ">
          {this.formatLetters(poem.letters)}
        </div>
        <PoemFooter poem={poem} inCreateView={this.inCreateView()} currentUser={this.props.currentUser}/>
      </div>
    );
  }

});
