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
    this.setState({ passage: newPassage, bookId: passageObj.id, bookTitle: passageObj.title});
  },

  startSelect: function(e){
    this.startIdx = e.target.getAttribute("data-idx");
  },

  endSelect: function(e){
    var startIdx = this.startIdx
    var endIdx = e.target.getAttribute("data-idx");
    if(startIdx && endIdx && (startIdx !== endIdx)){
      this.state.selected_texts.push(parseInt(startIdx));
      this.state.selected_texts.push(parseInt(endIdx));
      this.setState( {selected_texts: this.state.selected_texts.sort(function(a, b){return a-b})} );
    }
    // Important to keep them in passage order for display
  },

  toggleCentered: function () {
    this.setState({centered: !this.state.centered})
  },

  render: function () {
    var s = this.state;
    var currentPoem = {book_id: s.bookId, book_title: s.bookTitle, passage: s.passage, selected_texts: s.selected_texts, style: {centered: s.centered}}

    return(
      <div className="createView">
        <h2>Create</h2>
        <div onMouseDown={this.startSelect} onMouseUp={this.endSelect}>
          <Poem className="newPoem" poem={currentPoem} />
        </div>
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children, { appState: this.state })}
        </div>
      </div>
    );
  }
});
