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
    var is_blank;
    if(this.props.new){
      is_blank = true;
    }else{
      is_blank = false;
    }
    return {letters: {}, centered: false, select_by_word: true,
    passage_length: 1000, is_blank: is_blank, likes: {}, color_range: 0 };
  },

  getPoem: function () {
    var id = this.props.params.poemId;
    var poem = PoemStore.findPoem(id);
    if(poem){
      poem.centered = false;
      this.setState(poem);
      var wordLetters = this.formatLetters(poem.passage);
      poem.wordLetters = wordLetters;
      this.setState(poem);
    }
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
    this.shiftDownListener = document.addEventListener('keydown', this._setShiftDown);
    this.shiftUpListener = document.addEventListener('keyup', this._setShiftUp)
  },
  _setShiftDown: function(event){
    if(event.keyCode === 16 || event.charCode === 16){
        this.setState({select_by_word: !this.state.select_by_word});
    }
  },
  _setShiftUp: function(event){
    if(event.keyCode === 16 || event.charCode === 16){
        this.setState({select_by_word: !this.state.select_by_word})
    }
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
    // this.shiftDownListener.remove();
    // this.shiftUpListener.remove();
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassage = passageObj.text;

    this.setState({
      passage: newPassage,
      book_id: passageObj.id,
      book_title: passageObj.title,
    });

    this.resetSelected(this.state.passage);
  },
  splitWords : function(passage){
    var words = [];
    var word = "";
    // var startIdx = 0;
    passage.split("").forEach(function(ch, idx){
      word += ch;
      if(ch === " " || ch === "-"){
        words.push(word);
        word = "";
        // startIdx = idx;
      }
    });
    words.push(word); // last few letters with no space after
    return words;
  },

  formatLetters: function(passage){
    // passage = passage.substring(0, this.state.passage_length);
    var that = this;
    var wordArr = this.splitWords(passage);
    var idx = -1;
    var wordLetters = wordArr.map(function(word){
      return word.split("").map(function(letter){
        idx++;
        var is_selected = selectMixable.isHighlighted(that.state.selected_texts, idx);
        return {ch: letter, is_selected: is_selected};
      });
    });
    return wordLetters;
  },

  insStylize: function(){
    return (this.props.location.pathname.split("/").pop() === "stylize")
  },
  handleClick: function(e){
    if(!this.insStylize() && this.state.wordLetters){
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
    this.setState({wordLetters: wordLetters, is_blank: false});
  },

  wordClicked: function(wordIdx, letterIdx){
    var wordLetters = this.state.wordLetters;
    var opposite = !wordLetters[wordIdx][letterIdx].is_selected;
    wordLetters[wordIdx].forEach(function(letter){
      letter.is_selected = opposite;
    });
    this.setState({wordLetters: wordLetters, is_blank: false});
  },

  handleNudge: function (){
    if(this.state.is_blank){
      this.selectRandomWords();
    }else{
      this.resetSelected(this.state.passage);
    }
  },

  resetSelected: function (passage){
    // passage = passage.substring(0, this.state.passage_length);
    if(passage){
      var wordArr = this.splitWords(passage);
      var wordLetters = wordArr.map(function(word){
        return word.split("").map(function(letter){
          return {ch: letter, is_selected: false};
        });
      });
      this.setState({wordLetters: wordLetters, is_blank: true});
    }
  },


  selectRandomWords: function (){
    var length = this.state.wordLetters.length;
    for (var i = 0; i < 12; i++) {
      var idx = Math.floor((Math.random() * length));
      this.wordClicked(idx, 0);
    }
    this.setState({is_blank: false});
  },


  updatePoemState: function (newState) {
    this.setState(newState);
  },

  render: function () {
    var inStylize = false;
    if(this.insStylize()){
      inStylize = true;
    }
    var currentPoem = this.state;
    var classes = "createView ";

    var titleText = "Create";
    if(!this.props.new){
      titleText = "Edit";
    }

    var poemDiv;
    if(inStylize){
      titleText = "Stylize";
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
        <h2>{titleText}</h2>
        {inStylize ? "" : "*hold shift to temporarily switch to selection mode"}
        <div className="createPoem" onClick={this.handleClick}>
          {poemDiv}
        </div>
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children,
            { poem: currentPoem,
              new: this.props.new,
              inStylize: inStylize,
              currentUser: this.props.currentUser,
              updatePoemState: this.updatePoemState,
              handleNudge: this.handleNudge,
              toggleShowLogin: this.props.toggleShowLogin
           })}
        </div>
      </div>
    );
  }
});
