var React = require('react');

module.exports = React.createClass({
  formatLetters : function(){
    var word = this.props.word;
    var wordLetters = word.split("").map(function(letter, idx){
        var classes = "";
        // if(letter.is_selected){
        //   classes = "selected";
        // }
        // var ch = letter.ch;
        // debugger
        return (<span className={classes} data-idx={idx} key={idx}>{letter}</span>);
    });
    // debugger
    return wordLetters;
  },
  render: function () {
    var wordLetters = this.formatLetters();
    return(
      <span className="word" onClick={this.goToIndex}>
        {wordLetters}
      </span>
    );
  }
});
