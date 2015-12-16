var React = require('react');

module.exports = React.createClass({

  addHighlightSpans: function(pass){
    var selects = [].concat.apply([], this.props.selectedTexts);
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

    var pass = this.props.passage;
    pass = this.addHighlightSpans(pass);

    return(
      <div >
        NewPoem: {pass}
      </div>
    );
  }

});
