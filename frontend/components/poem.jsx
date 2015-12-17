var React = require('react');

module.exports = React.createClass({

  addHighlightSpans: function(pass){
    var selects = [].concat.apply([], this.props.poem.selected_texts);
    var i = 0;
    var nextChangeIdx
    if(selects.length !== 0){
      nextChangeIdx = selects[0]
    }
    var selected = false;

    // Write out edge cases on paper and a high-level pseudocode algorith
    // before you code it up

    // Examples:
    //   When I've selected a sentence and I select something else inside that sentence => "I eat food"
      // Full sentence is: "I eat food for breakfast"
      // "I eat food" is selected, then "eat food for breakfast" is selected
    //   When I select between words

    highlightedText = pass.split("").map(function(ch, idx){
      if(nextChangeIdx == idx){
        selected = selected ? false : true;
        i++;
        nextChangeIdx = selects[i];
      }

      var selectClass = selected ? "selected" : "";
      return <span className={selectClass} key={idx} data-idx={idx}>{ch}</span>
    })
    return highlightedText;
  },

  render: function () {

    var pass = this.props.poem.passage;
    pass = this.addHighlightSpans(pass);

    return(
      <div className="sinlgePoem">
        {pass}
        <div className="authorName">-{this.props.poem.author_id}</div>
      </div>
    );
  }

});
