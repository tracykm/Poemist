var React = require('react');
var Slider = require('./slider');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var userStore = require('../../stores/userStore');

var NUM_STYLES = 16;

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
    },200);
    if(this.props.poem.is_blank && this.props.new){
      alert("A blank poem? Really? \n\nGo click on some words.");
      this.history.pushState(null, "/new/create");
    }
  },
  componentWillUnmount: function(){
    $(".toolbar").addClass("pre-loading");
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
    if(oldStyle !== oldStyle){
      oldStyle = 0;
    }
    var newStyle = oldStyle - 1;
    if(newStyle < 0){
      newStyle = NUM_STYLES - 1;
    }
    this.props.updatePoemState({color_range: newStyle});
  },
  styleNext: function(){
    var oldStyle = parseInt(this.props.poem.color_range);
    if(oldStyle !== oldStyle){
      oldStyle = 0;
    }
    var newStyle = oldStyle + 1;
    newStyle = newStyle % NUM_STYLES;
    this.props.updatePoemState({color_range: newStyle});
  },
  toggleCentered: function(e){
    this.props.updatePoemState({centered: !this.props.poem.centered});
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <span className="button slider">
          Filter:
          <span onClick={this.stylePrev}>◀</span>
          <input onChange={this.updateStyle} value={this.props.poem.color_range}></input>
          <span onClick={this.styleNext}>▶</span>
        </span>
        <br/>
        <br/>
        <span className="button" onClick={this.toggleCentered}>center?</span>
        <br/>
        <br/>
        <span className="button" onClick={this.goToCreate}><i className="icon-arrow-left"></i> back</span>
        <br/>
        <br/>
        <span className="button bigger">
        <span onClick={this.finishPoem}>save <i className="icon-arrow-right"></i></span></span>
      </div>
    );
  }
});
