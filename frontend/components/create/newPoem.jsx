var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');


module.exports = React.createClass({
  getInitialState: function () {
    return { passage: "loading passage...", selected_texts: [] };
  },

  componentDidMount: function () {
    this.bookListener = BookStore.addListener(this._updatePassage);
    ApiUtil.getNewPassage();
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
    console.log(this.state);
    var s = this.state;
    poem = {book_id: s.bookId, passage: s.passage, selected_texts: s.selected_texts}
    ApiUtil.createPoem(poem)
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
      this.state.selected_texts.push(parseInt(startIdx));
      this.state.selected_texts.push(parseInt(endIdx));
      this.setState( {selected_texts: this.state.selected_texts.sort(function(a, b){return a-b})} );
    }
    console.log("texts", this.state.selected_texts);
    // Important to keep them in passage order for display
  },

  render: function () {
    var s = this.state;
    var currentPoem = {book_id: s.bookId, passage: s.passage, selected_texts: s.selected_texts}
    return(
      <div className="newPoem" onMouseDown={this.startSelect} onMouseUp={this.endSelect}>
        <Poem className="newPoem" poem={currentPoem} />
      </div>
    );
  }

});
