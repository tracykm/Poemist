var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var Poem = require('../poem.jsx');


module.exports = React.createClass({
  getInitialState: function () {
    return { poem: {passage: "loading passage...", selected_texts: []} };
  },

  componentDidMount: function () {
    this.bookListener = BookStore.addListener(this._updatePassage);
    ApiUtil.getNewPassage();
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
    console.log(this.state);
    ApiUtil.createPoem(this.state.poem)
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassage = passageObj.text
    this.setState({ poem: {passage: newPassage, book_id: passageObj.id, selected_texts: this.state.poem.selected_texts}});
  },

  startSelect: function(e){
    console.log("mouse down");
    this.startIdx = e.target.getAttribute("data-idx");
  },

  endSelect: function(e){
    console.log("mouse up");
    var startIdx = this.startIdx
    var endIdx = e.target.getAttribute("data-idx");
    console.log("poem selected ", this.state.poem);
    if(startIdx && endIdx && (startIdx !== endIdx)){
      this.state.poem.selected_texts.push(parseInt(startIdx));
      this.state.poem.selected_texts.push(parseInt(endIdx));
      this.setState( {selected_texts: this.state.poem.selected_texts.sort(function(a, b){return a-b})} );
    }
    // Important to keep them in passage order for display
  },

  render: function () {
      console.log("this.state", this.state);
    return(
      <div className="newPoem" onMouseDown={this.startSelect} onMouseUp={this.endSelect}>
        <Poem className="newPoem"
          poem={this.state.poem} />
      </div>
    );
  }

});
