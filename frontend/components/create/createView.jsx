var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');
var PoemStore = require('../../stores/poemStore.js');
var ApiUtil = require('../../util/apiUtil.js');


module.exports = React.createClass({
  getInitialState: function () {
    return { passage: "loading passage...", selected_texts: [], centered: false, select_by_word: true };
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
    this.setState({ passage: newPassage, book_id: passageObj.id, book_title: passageObj.title, selected_texts: []});
  },

  clickedWord: function (e){
    var idx = e.target.getAttribute("data-idx");
    idx = parseInt(idx);
    if(idx){
      selected_texts = this.state.selected_texts;

      var selectStartStop;
      if(this.state.select_by_word){
        selectStartStop = this._wordStartEnd(idx);
      }else{
        selectStartStop = [idx, idx]
      }
      console.log("selectStartStop", selectStartStop);
      if(selectStartStop){
        selected_texts.push(selectStartStop)
        var selected_texts = deleteDuplicates(selected_texts);
        this.setState({selected_texts: selected_texts})
      }
    }
  },

  _wordStartEnd: function (idx){
    idx = JSON.parse(idx);
    if(idx == null){
      return null
    }
    var passage = this.state.passage;
    var endIdx = idx;
    // find end of word
    while (passage[endIdx] !== " " && idx < passage.length) {
      endIdx++;
    }
    // find start of word
    var startIdx = idx;
    while (passage[startIdx] !== " " && idx > 0) {
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
