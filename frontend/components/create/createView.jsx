var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');
var PoemStore = require('../../stores/poemStore.js');


module.exports = React.createClass({
  getInitialState: function () {
    return {letters: {}, centered: false, select_by_word: true,
    passage_length: 700, is_blank: true, likes: {} };
  },

  getPoem: function () {
    var id = this.props.params.poemId;
    var poem = PoemStore.findPoem(id);
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
      this.bookListener = PoemStore.addListener(this.getPoem)
    }
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassage = passageObj.text

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
      letters = this.state.letters;
      if(select_by_word){
        this._selectWord(idx)
      }else{
        selectLetter(idx, letters)
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
    var letters = this.state.letters
    var wordBounds = this._wordStartEnd(idx);
    var always_select = !letters[idx].is_selected;
    for (var i = wordBounds[0]; i < wordBounds[1]; i++) {
      selectLetterSame(i, letters, always_select)
    }
  },

  _wordStartEnd: function (idx){
    if(idx == null){
      return null
    }
    var letters = this.state.letters;
    var endIdx = idx;

    last_idx = letters.length -2
    // find end of word
    while (letters[endIdx].ch !== " " && idx < last_idx) {

      endIdx++;
    }
    // find start of word
    first_idx = 1
    var startIdx = idx;
    while (letters[startIdx].ch !== " " && idx > first_idx) {
      startIdx--;
    }
    return [startIdx, endIdx];
  },

  updatePoemState: function (newState) {
    this.setState(newState)
  },

  render: function () {
    var currentPoem = this.state;
    return(
      <div className="createView">
        *shift click to select by letter
        <div onClick={this._clickedWord}>
          <Poem className="newPoem" poem={currentPoem} />
        </div>
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children,
            { new: this.props.new, poem: currentPoem,
              updatePoemState: this.updatePoemState,
              handleNudge: this.handleNudge })}
        </div>
      </div>
    );
  }
});

function selectLetter (idx, letters){
  letter = letters[idx];
  letter.is_selected = !letter.is_selected;
  letters[idx] = letter;
}

// always select or unselect
function selectLetterSame (idx, letters, always_select){
  letter = letters[idx];
  if(always_select){
    letter.is_selected = true;
  }else{
    letter.is_selected = false;
  }
  letters[idx] = letter;
}

function deleteDuplicates (myArr) {
  var map = new Object();

  for(var i = 0; i < myArr.length; i++)
  {
      if(map[myArr[i]] === undefined)
      {
          map[myArr[i]] = 1;
      }
      else
      {
          map[myArr[i]]++;
      }
  }

  var result = new Array();

  for(var i = 0; i < myArr.length; i++)
  {
      if(map[myArr[i]] > 1)
      {
          //do nothing
      }
      else
      {
          result.push(myArr[i]);
      }

  }

  return result
};
