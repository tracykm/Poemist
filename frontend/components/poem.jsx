var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var History = require('react-router').History;
var DropDown = require('./userInfo/dropDown');
var PoemFooter = require('./poemFooter');

module.exports = React.createClass({
  mixins: [History],
  delete: function(e){
    if (confirm('Delete poem? \nIt was really good, we all thought so :(')) {
      ApiUtil.deletePoem(this.props.poem.id);
      if(this._inCreateView){
        this.history.pushState(null, "/");
      }
    }
  },

  edit: function(e){
    this.history.pushState(null, "/edit/"+this.props.poem.id+"/create");
  },

  goToPoem: function(e){
    if(this.props.poem.id){
      window.scrollTo(0,0);
      this.history.pushState(null, "/poem/"+this.props.poem.id);
    }
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

  _inCreateView: function(){
    // highly breakable if div nesting or class change
    return this.props.className === "newPoem";
  },


  render: function () {
    var poem = this.props.poem;

    var deleteBtn = "";
    var editBtn = "";
    var zoomBtn = "";
    if(parseInt(window.current_user.id) === this.props.poem.author_id){
      deleteBtn = <span className="deleteBtn" onClick={this.delete}>✕</span>;
      editBtn = <span className="editBtn" onClick={this.edit}>edit</span>;
      zoomBtn = <span className="zoomBtn" onClick={this.goToPoem}>	🔍<i class="icon-zoom-in"></i> icon-zoom-in</span>;
    }


    var classes = "";
    classes += poem.centered ? 'centered' : ' '+ classes;
    classes += " sinlgePoem noSelect style" + this.props.poem.color_range;


    return(
      <div className={classes}>
        <div className="poemTopLeft">{deleteBtn}{editBtn}{zoomBtn}</div>
        <div className="poemText ">
          {this.formatLetters(poem.letters)}
        </div>
        <PoemFooter poem={poem} inCreateView={this._inCreateView()} currentUser={this.props.currentUser}/>
      </div>
    );
  }

});
