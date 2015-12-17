var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');


module.exports = React.createClass({
  getInitialState: function () {
    return { passage: "loading passage...", selected_texts: [], centered: true };
  },

  componentDidMount: function () {
    this.bookListener = BookStore.addListener(this._updatePassage);
    ApiUtil.getNewPassage();
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
    var s = this.state;
    poem = {book_id: s.bookId, passage: s.passage, selected_texts: s.selected_texts, style: {centered: s.centered}}
    ApiUtil.createPoem(poem)
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassage = passageObj.text
    this.setState({ passage: newPassage, bookId: passageObj.id, bookTitle: passageObj.title, selected_texts: []});
  },

  clickedWord: function (e){
    console.log("clicked");
    var idx = e.target.getAttribute("data-idx");
    selected_texts = this.state.selected_texts;
    var wordBounds = this._wordStartEnd(idx);
    if(wordBounds){
      selected_texts.push(wordBounds)
      console.log("before", JSON.stringify(selected_texts));
      var selected_texts = deleteDuplicates(selected_texts);
      console.log("after", JSON.stringify(selected_texts));
      this.setState({selected_texts: selected_texts})
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
    console.log([startIdx, endIdx]);
    return [startIdx, endIdx];
  },

  toggleCentered: function () {
    this.setState({centered: !this.state.centered})
    console.log("toggle centered", this.state.centered);
  },

  render: function () {
    var s = this.state;
    var currentPoem = {book_id: s.bookId, book_title: s.bookTitle, passage: s.passage, selected_texts: s.selected_texts, style: {centered: s.centered}}

    return(
      <div className="createView">
        <h2>Create</h2>
        <div onClick={this.clickedWord}>
          <Poem className="newPoem" poem={currentPoem} />
        </div>
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children, { toggleCentered: this.toggleCentered })}
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
