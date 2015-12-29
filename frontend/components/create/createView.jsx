var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var PoemSelectable = require('../singlePoem/poemSelectable.jsx');
var Poem = require('../singlePoem/poem.jsx');
var PoemStore = require('../../stores/poemStore.js');
var myMixables = require('../../util/myMixables');
var selectMixable = require('../../util/selectMixable');


module.exports = React.createClass({
  getInitialState: function () {
    return {letters: {}, centered: false, select_by_word: true,
    passage_length: 700, is_blank: true, likes: {}, color_range: 0 };
  },

  getPoem: function () {
    var id = this.props.params.poemId;
    var poem = PoemStore.findPoem(id);
    if(poem){
      var letters = myMixables.lettersArray(poem);
      poem.letters = letters;
    }
    poem.centered = false;
    this.setState(poem);
  },

  componentDidMount: function () {
    if(this.props.new){
      this.bookListener = BookStore.addListener(this._updatePassage);
      ApiUtil.getNewPassage();
    }else{
      var id = this.props.params.poemId;
      ApiUtil.getPoem(id);
      this.bookListener = PoemStore.addListener(this.getPoem);
    }
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassage = passageObj.text;

    this.setState({
      passage: newPassage,
      book_id: passageObj.id,
      book_title: passageObj.title,
      wordLetters: this.formatLetters(newPassage)});

    // this.resetSelected();
  },
  splitWords : function(passage){
    var words = [];
    var word = "";
    // var startIdx = 0;
    passage.split("").forEach(function(ch, idx){
      word += ch;
      if(ch === " "){
        words.push(word);
        word = "";
        // startIdx = idx;
      }
    });
    return words;
  },

  formatLetters: function(passage){
    var wordArr = this.splitWords(passage);
    var wordLetters = wordArr.map(function(word){
      return word.split("").map(function(letter, idx){
        return {ch: letter, is_selected: false};
      });
    });
    return wordLetters;
  },

  handleClick: function(e){
    if(this.state.wordLetters){
      var letterIdx = e.target.getAttribute("data-idx");
      var wordIdx = e.target.parentElement.getAttribute("data-word-idx");
      if(this.state.select_by_word){
        this.wordClicked(wordIdx, letterIdx);
      }else{
        this.letterClicked(wordIdx, letterIdx);
      }
    }
  },

  letterClicked: function(wordIdx, letterIdx){
    var wordLetters = this.state.wordLetters;
    var opposite = !wordLetters[wordIdx][letterIdx].is_selected;
    wordLetters[wordIdx][letterIdx].is_selected = opposite;
    this.setState({wordLetters: wordLetters});
  },

  wordClicked: function(wordIdx, letterIdx){
    var wordLetters = this.state.wordLetters;
    var opposite = !wordLetters[wordIdx][letterIdx].is_selected;
    wordLetters[wordIdx].forEach(function(letter){
      letter.is_selected = opposite;
    });
    this.setState({wordLetters: wordLetters});
  },

  handleNudge: function (){
    if(this.state.is_blank){
      this.selectRandomWords();
    }else{
      this.resetSelected();
    }
  },


  updatePoemState: function (newState) {
    this.setState(newState);
  },

  render: function () {
    var inStylize = false;
    if(this.props.location.pathname.split("/").pop() === "stylize"){
      inStylize = true;
    }
    var currentPoem = this.state;
    var classes = "createView ";

    var poemDiv;
    if(inStylize){
      classes += "stylize";
      poemDiv = (<Poem className="newPoem"
                inCreateView={true} inStylize={inStylize}
                poem={currentPoem} />);
    }else{
      classes += "write";
      poemDiv = (<PoemSelectable className="newPoem"
                inCreateView={true} inStylize={inStylize}
                poem={currentPoem} />);
    }

    return(
      <div className={classes}>
        <div className="createPoem" onClick={this.handleClick}>
          {poemDiv}
        </div>
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children,
            { poem: currentPoem,
              new: this.props.new,
              inStylize: inStylize,
              updatePoemState: this.updatePoemState,
              handleNudge: this.handleNudge })}
        </div>
      </div>
    );
  }
});
