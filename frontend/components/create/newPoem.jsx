var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');

module.exports = React.createClass({
  getInitialState: function () {
    return { passageText: "loading passage...", passageId: null, selectedTexts: [] };
  },

  componentDidMount: function () {
    BookStore.addListener(this._updatePassage);
    ApiUtil.getNewPassage();
  },

  _updatePassage: function () {
    var passageObj = BookStore.all();
    var newPassageText = passageObj.text
    this.setState({ passageText: newPassageText, bookId: passageObj.id});
  },

  startSelect: function(e){
    this.startIdx = e.target.getAttribute("data-idx");
  },

  endSelect: function(e){
    console.log("start", this.startIdx);
    var endIdx = e.target.getAttribute("data-idx");
    console.log(e.target);
    console.log("end", endIdx);
    if(!endIdx){
      endIdx = 100;
    }
    var currentSelected = [this.startIdx, endIdx];
    this.state.selectedTexts.push(currentSelected.sort(function(a, b){return a-b}));
    this.setState( {selectedTexts: this.state.selectedTexts.sort(function(a, b){return a-b})} );
    // Important to keep them in passage order for display
  },

  render: function () {
    console.log(JSON.stringify(this.state.selectedTexts));

    var selects = this.state.selectedTexts;
    var i = 0;
    var highlightChangeIdx
    if(selects.length !== 0){
      highlightChangeIdx = selects[0][0]
    }
    var selected = false;
    var finnished = false;

    var pass = this.state.passageText
    pass = pass.split("").map(function(ch, idx){
      if(highlightChangeIdx == idx && !finnished){
        if(selected){
          selected = false;
          i++;
          if(i > 40){
            finnished = true
          }
          debugger
          highlightChangeIdx = selects[i][0];
        }else{
          selected = true;
          highlightChangeIdx = selects[i][1];
        }
      }
      var selectClass = selected ? "selected" : "";
      return <span className={selectClass} key={idx} data-idx={idx}>{ch}</span>
    })

    return(
      <div className="newPoem" onMouseDown={this.startSelect} onMouseUp={this.endSelect}>
        NewPoem: {pass}
      </div>
    );
  }
});
