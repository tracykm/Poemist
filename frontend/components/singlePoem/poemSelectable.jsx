var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var DropDown = require('.././userNav/dropDown');
var PoemFooter = require('./poemFooter');
var PoemTop = require('./poemTop');
var Word = require('./word');

module.exports = React.createClass({
  inCreateView: function(){
    // highly breakable if div nesting or class change
    return this.props.className === "newPoem";
  },


  render: function () {
    var poem = this.props.poem;

    var classes = "";
    classes += poem.centered ? 'centered' : ' '+ classes;
    classes += " sinlgePoem noSelect";

    if(poem.wordLetters){
      var poemWords = poem.wordLetters.map(function(word, wordIdx){
        var lastIdx = poem.wordLetters.length - 1;
        if(lastIdx === wordIdx){
          return;
        }
        return (<Word word={word} key={wordIdx} wordIdx={wordIdx}/>);
      });
    }

    var poemTextClasses = "poemText ";
    poemTextClasses += this.props.poem.select_by_word ? 'selectByWord' : 'selectByLetter';

    return(
      <div className={classes}>
        <PoemTop poem={poem} inCreateView={true}/>
        <div className={poemTextClasses}>
          {poemWords}
        </div>
        <PoemFooter poem={poem} inCreateView={this.inCreateView()} currentUser={this.props.currentUser}/>
      </div>
    );
  }

});
