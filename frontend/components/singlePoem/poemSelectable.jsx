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
    classes += " sinlgePoem noSelect style" + this.props.poem.color_range;

    if(poem.passage){
      var poemWords = poem.wordLetters.map(function(word, wordIdx){
        return (<Word word={word} key={wordIdx} wordIdx={wordIdx}/>);
      });
    }

    return(
      <div className={classes}>
        <PoemTop poem={poem} />
        <div className="poemText ">
          {poemWords}
        </div>
        <PoemFooter poem={poem} inCreateView={this.inCreateView()} currentUser={this.props.currentUser}/>
      </div>
    );
  }

});
