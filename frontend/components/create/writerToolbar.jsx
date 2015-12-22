var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({
  mixins: [History, Navigation],
  goToStyle: function(){
    if(this.props.new){
      this.history.pushState(null, "/new/stylize");
    }else{
      var id = this.props.params.poemId;
      this.history.pushState(null, "/edit/"+id+"/create/stylize");
    }
  },
  shufflePassage: function(){
    ApiUtil.getNewPassage();
  },
  toggleSelectWord: function(){
    this.props.updatePoemState({select_by_word: !this.props.poem.select_by_word});
  },
  render: function () {
    var shuffleBtn = "";
    if(this.props.new){
      shuffleBtn = <button onClick={this.shufflePassage}>shuffle</button>;
    }

    var nudgeBtn = this.props.poem.is_blank ? "nudge" : "reset";
    var wordBtn = this.props.poem.select_by_word ? "select by letter?" : "select by word?";
    return(
      <div className="writerToolbar">
        <h4>Writing Toolbar</h4>
        <button title="shift + click" onClick={this.toggleSelectWord}>{wordBtn}</button>
        <br/>
        <button onClick={this.props.handleNudge}>{nudgeBtn}</button>
        <br/>
        {shuffleBtn}
        <br/>
        <button className="bigger" onClick={this.goToStyle}>stylize▶</button>
      </div>
    );
  }
});
