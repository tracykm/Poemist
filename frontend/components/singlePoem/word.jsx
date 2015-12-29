var React = require('react');

module.exports = React.createClass({
  formatLetters : function(word){
    var wordLetters = word.map(function(letterObj, idx){
      var classes = "";
      if(letterObj.is_selected){
        classes += "selected";
      }
      return (<span className={classes} data-idx={idx} key={idx}>{letterObj.ch}</span>);
    });
    return wordLetters;
  },
  render: function () {
    var wordLetters = this.formatLetters(this.props.word);
    return(
      <span className="word" data-word-idx={this.props.wordIdx}>
        {wordLetters}
      </span>
    );
  }
});
