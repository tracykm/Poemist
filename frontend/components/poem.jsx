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

  addHighlightSpans: function(passage){
    var selects = this.props.poem.selected_texts;

    var selectedClass = "";
    highlightedText = passage.split("").map(function(ch, idx){

      debugger
      if(isHighlighted(selects, idx)){
        selectedClass = "selected";
      }else{
        selectedClass = "";
      }
      console.log(selectedClass);

      return <span key={idx} className={selectedClass} data-idx={idx}>{ch}</span>
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
        <div className="poemFooter">
          <div className="authorName">-{this.props.poem.author}</div>
          <div className="bookTitle">{this.props.poem.book_title}</div>
          {editBtn}
          {deleteBtn}
        </div>
      </div>
    );
  }

});

function isHighlighted(highlights, idx){
  for (var i = 0; i < highlights.length; i++) {
    var highlight = highlights[i];
    if(isBetween(highlight[0], idx, highlight[1])){
      return true;
    }
  }
  return false
}

// inclusive isBetween(1,1,5) = true
function isBetween(lower, middle, higher){
  if(middle < lower){
    return false;
  }
  if(middle > higher){
    return false;
  }
  return true;
}
