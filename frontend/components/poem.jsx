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

    var passArr = pass.split("");



    selects.forEach(function(pair){
      var startIdx = pair[0];
      var endIdx = pair[1];
      passArr[startIdx] = passArr[startIdx] + '<span className="selected">';
      passArr[endIdx] = passArr[endIdx] + '</span>';
      console.log("passArr", passArr);
      console.log("endIdx", endIdx);
    });

    highlightedText = passArr.map(function(ch, idx){

      return <span key={idx} data-idx={idx}>{ch}</span>
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
