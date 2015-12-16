var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');


module.exports = React.createClass({
  getInitialState: function () {
    return { passage: "loading passage...", bookId: null, selectedTexts: [] };
  },

  componentDidMount: function () {
    this.bookListener = BookStore.addListener(this._updatePassage);
    ApiUtil.getNewPassage();
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
    console.log(this.state);
    var s = this.state;
    ApiUtil.createPoem({book_id: s.bookId, passage: s.passage, selected_texts: s.selectedTexts})
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassage = passageObj.text
    this.setState({ passage: newPassage, bookId: passageObj.id});
  },

  startSelect: function(e){
    console.log("mouse down");
    this.startIdx = e.target.getAttribute("data-idx");
  },

  endSelect: function(e){
    console.log("mouse up");
    var startIdx = this.startIdx
    var endIdx = e.target.getAttribute("data-idx");
    if(startIdx && endIdx && (startIdx !== endIdx)){
      this.state.selectedTexts.push(parseInt(startIdx));
      this.state.selectedTexts.push(parseInt(endIdx));
      this.setState( {selectedTexts: this.state.selectedTexts.sort(function(a, b){return a-b})} );
    }
    console.log("texts", this.state.selectedTexts);
    // Important to keep them in passage order for display
  },

  render: function () {
    return(
      <div className="newPoem" onMouseDown={this.startSelect} onMouseUp={this.endSelect}>
        <Poem className="newPoem"
          passage={this.state.passage}
          selectedTexts={this.state.selectedTexts} />
      </div>
    );
  }

});
