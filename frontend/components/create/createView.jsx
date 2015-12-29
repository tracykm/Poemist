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
    this.hoverWordListener = document.querySelector(".write .poemText").addEventListener("mouseover", function(e){
      console.log("mouseover", e.target.getAttribute("data-idx"));
    });
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
      book_title: passageObj.title});

    this.resetSelected();
  },

  resetSelected: function (){
    var letters = [];
    var passage = this.state.passage;
    passage.split("").forEach(function(letter, idx){
      letters.push({ch: letter, is_selected: false});
    });
    this.setState({letters: letters, is_blank: true});
  },

  _clickedWord: function (e){
    var select_by_word = this.state.select_by_word;
    if(e.shiftKey){
      select_by_word = false;
    }
    var idx = e.target.getAttribute("data-idx");
    idx = parseInt(idx);
    if(idx){
      var letters = this.state.letters;
      if(select_by_word){
        this._selectWord(idx);
      }else{
        selectMixable.selectLetter(idx, letters);
      }
      this.setState({letters: letters, is_blank: false});
    }
  },

  handleNudge: function (){
    if(this.state.is_blank){
      this.selectRandomWords();
    }else{
      this.resetSelected();
    }
  },

  selectRandomWords: function (){
    var length = this.state.letters.length;
    for (var i = 0; i < 12; i++) {
      var idx = Math.floor((Math.random() * length));
      this._selectWord(idx);
    }
    this.setState({is_blank: false});
  },

  _selectWord: function (idx){
    var letters = this.state.letters;
    var wordBounds = selectMixable.wordStartEnd(idx, this.state.letters);
    var always_select = !letters[idx].is_selected;
    for (var i = wordBounds[0]; i < wordBounds[1]; i++) {
      selectMixable.selectLetterSame(i, letters, always_select);
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
        <div className="createPoem" onClick={this._clickedWord}>
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
