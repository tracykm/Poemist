var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');


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
    this.startIdx = e.target.getAttribute("data-idx");
  },

  endSelect: function(e){
    var startIdx = this.startIdx
    var endIdx = e.target.getAttribute("data-idx");
    if(startIdx && endIdx && (startIdx !== endIdx)){
      this.state.selectedTexts.push(parseInt(startIdx));
      this.state.selectedTexts.push(parseInt(endIdx));
      this.setState( {selectedTexts: this.state.selectedTexts.sort(function(a, b){return a-b})} );
    }
    // Important to keep them in passage order for display
  },

  addHighlightSpans: function(pass){
    var selects = [].concat.apply([], this.state.selectedTexts);
    var i = 0;
    var nextChangeIdx
    if(selects.length !== 0){
      nextChangeIdx = selects[0]
    }
    var selected = false;

    highlightedText = pass.split("").map(function(ch, idx){
      if(nextChangeIdx == idx){
        selected = selected ? false : true;
        i++;
        nextChangeIdx = selects[i];
      }
      var selectClass = selected ? "selected" : "";
      return <span className={selectClass} key={idx} data-idx={idx}>{ch}</span>
    })
    console.log(selects);
    return highlightedText;
  },

  render: function () {

    var pass = this.state.passage;
    pass = this.addHighlightSpans(pass);

    return(
      <div className="newPoem" onMouseDown={this.startSelect} onMouseUp={this.endSelect}>
        NewPoem: {pass}
      </div>
    );
  }
});
