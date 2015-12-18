var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');
var PoemStore = require('../../stores/poemStore.js');
var ApiUtil = require('../../util/apiUtil.js');


module.exports = React.createClass({
  getInitialState: function () {
    return {letters: {}, centered: false, select_by_word: false };
  },

  getPoem: function () {
    var id = this.props.params.poemId;
    poem = PoemStore.findPoem(id);
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
    var letters = {};
    newPassage.split("").forEach(function(letter, idx){
      letters[idx] = {position_idx: idx, ch: letter, is_selected: false};
    });
    this.setState({ letters: letters, book_id: passageObj.id, book_title: passageObj.title});
  },

  clickedWord: function (e){
    var idx = e.target.getAttribute("data-idx");
    idx = parseInt(idx);
    if(idx){
      letters = this.state.letters;
      if(this.state.select_by_word){
        var wordBounds = this._wordStartEnd(idx);
        var start = wordBounds[0];
        var stop = wordBounds[1];
        for (var i = start; i < stop; i++) {
          selectLetter(i, letters)
        }
      }else{
        selectLetter(idx, letters)
      }
      this.setState({letters: letters});
    }
  },

  _wordStartEnd: function (idx){
    if(idx == null){
      return null
    }
    var letters = this.state.letters;
    var endIdx = idx;

    last_idx = Object.keys(letters).pop()
    // find end of word
    while (letters[endIdx].ch !== " " && idx < last_idx) {
      endIdx++;
    }
    // find start of word
    first_idx = Object.keys(letters)[0]
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
        <h2>Create</h2>
        <div onClick={this.clickedWord}>
          <Poem className="newPoem" poem={currentPoem} />
        </div>
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children,
            { new: this.props.new, poem: currentPoem, updatePoemState: this.updatePoemState})}
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
