var React = require('react');
var Slider = require('./slider');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var userStore = require('../../stores/userStore');

var NUM_STYLES = 20;
var NUM_COLORS = 36;

module.exports = React.createClass({
  mixins: [History],
  getInitialState: function(){
    return ({showLogin: false, triedSave: false});
  },
  goToCreate: function(){
    if(this.props.new){
      this.history.pushState(null, "/new/create");
    }else{
      var id = this.props.params.poemId;
      this.history.pushState(null, "/edit/"+id+"/create");
    }
    if(this.props.poem.centered){
      this.toggleCentered();
    }
  },
  componentDidMount: function(){
    setTimeout(function(){
      $(".toolbar").removeClass("pre-loading");
      $("h2, .hint").removeClass("pre-loading");
    },200);
    if(this.props.poem.is_blank && this.props.new){
      alert("A blank poem? Really? \n\nGo click on some words.");
      this.history.pushState(null, "/new/create");
    }
  },
  componentWillUnmount: function(){
    $(".toolbar").addClass("pre-loading");
    $("h2, .hint").addClass("pre-loading");
  },
  componentWillReceiveProps: function(newProps){
    if(newProps.currentUser && this.state.triedSave){ // to automatically save when logged in
      this.finishPoem();
    }
  },
  finishPoem: function(){
    var poem = this.props.poem;
    if(!this.props.currentUser){
      this.setState({triedSave: true});
      this.props.toggleShowLogin("Can't save a poem without a username, you know you want one...");
      return;
    }
    poem.wordLetters = []; // don't pass this unnecesarry info
    if(this.props.new){
      ApiUtil.createPoem(poem);
    }else{
      ApiUtil.updatePoem(poem);
    }
    this.history.pushState(null, "/profile");
  },
  updateStyle: function(e){
    var styleNum = e.target.value;
    this.props.updatePoemState({color_range: styleNum});
  },
  stylePrev: function(){
    var oldStyle = parseInt(this.props.poem.color_range);
    var newStyle = sliderNext(oldStyle, NUM_STYLES, -1);
    this.props.updatePoemState({color_range: newStyle});
  },
  styleNext: function(){
    var oldStyle = parseInt(this.props.poem.color_range);
    var newStyle = sliderNext(oldStyle, NUM_STYLES, 1);
    this.props.updatePoemState({color_range: newStyle});
  },
  updateColor: function(e){
    var colorNum = e.target.value;
    this.props.updatePoemState({background_id: colorNum});
  },
  colorPrev: function(){
    var oldColor = parseInt(this.props.poem.background_id);
    var newColor = sliderNext(oldColor, NUM_COLORS, -3);
    this.props.updatePoemState({background_id: newColor});
  },
  colorNext: function(){
    var oldColor = parseInt(this.props.poem.background_id);
    var newColor = sliderNext(oldColor, NUM_COLORS, 3);
    this.props.updatePoemState({background_id: newColor});
  },
  toggleCentered: function(e){
    this.props.updatePoemState({centered: !this.props.poem.centered});
  },
  render: function () {
    $(".dragger").css("left", this.props.poem.background_id*(40/20) + 20 + "px");
    return(
      <div className="styleToolbar">
        <span className="button slider">
          Filter:
          <span onClick={this.stylePrev}>◀</span>
          <input onChange={this.updateStyle} value={this.props.poem.color_range}></input>
          <span onClick={this.styleNext}>▶</span>
        </span>
        <span className="button colorSlider">
          Color:
          <br/>
          <span onClick={this.colorPrev}>◀</span>
          <span className="dragger">||</span>----------
          <input className="hidden" onChange={this.updateColor} value={this.props.poem.background_id}></input>
          <span onClick={this.colorNext}>▶</span>
        </span>
        <span className="button" onClick={this.toggleCentered}>center?</span>
        <span className="button" onClick={this.goToCreate}><i className="icon-arrow-left"></i> back</span>
        <span className="button bigger">
        <span onClick={this.finishPoem}>save <i className="icon-arrow-right"></i></span></span>
      </div>
    );
  }
});

function sliderNext(oldOpt, numOptions, increment){
  if(oldOpt !== oldOpt){
    oldOpt = 0;
  }
  var newOpt = oldOpt + increment;
  if(newOpt < 0){
    newOpt = numOptions + increment;
  }
  newOpt = newOpt % numOptions;
  return newOpt;
}
