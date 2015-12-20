var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  delete: function(e){
    ApiUtil.deletePoem(this.props.poem.id)
  },

  edit: function(e){
    this.history.pushState(null, "/edit/"+this.props.poem.id+"/create");
  },

  formatLetters : function(letters){
    var poem = this.props.poem
    var lettersArr = Object.keys(poem.letters).map(function(key){return poem.letters[key]})
    var poemLetters = lettersArr.map(function(letter, idx){
      // if(idx < poem.passage_length){
        var classes = ""
        if(letter.is_selected){
          classes = "selected"
        }
        var ch = letter.ch
        return <span className={classes} data-idx={idx} key={idx}>{letter.ch}</span>
      // }
    });

    return poemLetters
  },

  goToUserProfile(){
    window.scrollTo(0,0);
    this.history.pushState(null, "/user/"+this.props.poem.author_id);
  },

  toggleLike(){
    ApiUtil.toggleLike({poem_id: this.props.poem.id, liker_id: current_user.id});
    this.forceUpdate()
    // find way to add poem to store and update
  },


  render: function () {
    var poem = this.props.poem

    var deleteBtn = "";
    var editBtn = "";
    if(current_user.id==this.props.poem.author_id){
      deleteBtn = <span className="deleteBtn" onClick={this.delete}>x</span>;
      editBtn = <span className="editBtn" onClick={this.edit}>edit</span>;
    }

    var classes = poem.centered ? 'centered' : ''+ classes;
    classes = "sinlgePoem noSelect " + classes + " style"+this.props.poem.color_range;
    return(
      <div className= {classes}>
        {this.formatLetters(poem.letters)}
        <div className="poemFooter">
          <div className="authorName link" onClick={this.goToUserProfile}>
            -{this.props.poem.author}</div>
          <div className="bookTitle">{this.props.poem.book_title}</div>
          {editBtn}
          {deleteBtn}
          <span className="likes link" onClick={this.toggleLike}> ❤ {this.props.poem.likes.length}</span>
        </div>
      </div>
    );
  }

});
