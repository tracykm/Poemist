var React = require('react');
var ApiUtil = require('../util/apiUtil.js');

module.exports = React.createClass({

  delete: function(e){
    console.log("delete", e);
    ApiUtil.deletePoem(this.props.poem.id)
  },

  edit: function(e){
    alert("editing")
  },

  addHighlightSpans: function(pass){
    var selects = this.props.poem.selected_texts;
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
    // console.log(this.props.poem);

    var poem = this.props.poem

    pass = this.addHighlightSpans(poem.passage);

    var deleteBtn = "";
    var editBtn = "";
    if(current_user.id==this.props.poem.author_id){
      deleteBtn = <span className="deleteBtn" onClick={this.delete}>x</span>;
      editBtn = <span className="editBtn" onClick={this.edit}>edit</span>;
    }

    var classes = poem.style.centered ? 'centered' : ''+ classes;
    classes = "sinlgePoem " + classes;
    return(
      <div className= {classes}>
        {pass}
        <div className="authorName">-{this.props.poem.author}</div>
        <div className="bookTitle">{this.props.poem.book_title}</div>
        {editBtn}
        {deleteBtn}
      </div>
    );
  }

});
