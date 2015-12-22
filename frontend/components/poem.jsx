var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var History = require('react-router').History;
var Username = require('./userInfo/username');
var DropDown = require('./userInfo/dropDown');

module.exports = React.createClass({
  mixins: [History],
  delete: function(e){
    if (confirm('Delete poem? \nIt was really good, we all thought so :(')) {
      ApiUtil.deletePoem(this.props.poem.id);
    }
  },

  edit: function(e){
    this.history.pushState(null, "/edit/"+this.props.poem.id+"/create");
  },

  goToPoem: function(){
    window.scrollTo(0,0);
    this.history.pushState(null, "/poem/"+this.props.poem.id);
  },

  formatLetters : function(letters){
    var poem = this.props.poem;
    var lettersArr = Object.keys(poem.letters).map(function(key){return poem.letters[key];});
    var poemLetters = lettersArr.map(function(letter, idx){
      // if(idx < poem.passage_length){
        var classes = "";
        if(letter.is_selected){
          classes = "selected";
        }
        var ch = letter.ch;
        return (<span className={classes} data-idx={idx} key={idx}>{letter.ch}</span>);
      // }
    });

    return poemLetters;
  },


  toggleLike: function(){
    ApiUtil.toggleLike({poem_id: this.props.poem.id, liker_id: window.current_user.id});
    this.forceUpdate();
    // find way to add poem to store and update
  },

  _inCreateView: function(){
    return this.props.className === "newPoem";
  },


  render: function () {
    var poem = this.props.poem;

    var deleteBtn = "";
    var editBtn = "";
    if(parseInt(window.current_user.id) === this.props.poem.author_id){
      deleteBtn = <span className="deleteBtn" onClick={this.delete}>✕</span>;
      editBtn = <span className="editBtn" onClick={this.edit}>edit</span>;
    }

    var num_likes = Object.keys(this.props.poem.likes).length;
    var author = {id: this.props.poem.author_id, username: this.props.poem.author};

    var classes = "";
    classes += poem.centered ? 'centered' : ' '+ classes;
    classes += " sinlgePoem noSelect style" + this.props.poem.color_range;

    var created_at = new Date(poem.created_at);
    var minutes = timeAgo(created_at);

    var bottomMiddle = (<span className="timeAgo"> {minutes} </span>);
    if(this._inCreateView()){
      bottomMiddle = (<span className="bookTitle">{this.props.poem.book_title}</span>);
    }

    return(
      <div className={classes}>
        <div className="poemTopLeft">{deleteBtn}{editBtn}</div>
        <div className="poemText subtleLink">
          {this.formatLetters(poem.letters)}
        </div>
        <div className="poemFooter">
          -<Username className="authorName link" user={author}/>
        <span className="bottomMiddle">
          {bottomMiddle}
        </span>
          <span className="likes link" onClick={this.toggleLike}> ❤ {num_likes}</span>
        </div>

      </div>
    );
  }

});

function timeAgo(date){
  var now = new Date();
  var seconds = Math.floor((now - date) / 1000);
  if(seconds < 60){
    return seconds + " seconds ago";
  }
  var minutes = Math.floor(seconds / 60);
  if(minutes < 60){
    return minutes + " minutes ago";
  }
  var hours = Math.floor(minutes / 60);
  if(hours < 24){
    return hours + " hours ago";
  }
  var days = Math.floor(hours / 24);
  return days + " days ago";
}
