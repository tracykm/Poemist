var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var Navigation = require('react-router').Navigation;
var selectMixable = require('../../util/selectMixable');

module.exports = React.createClass({
  mixins: [History, Navigation],
  goToStyle: function(){
    var selects = selectMixable.getSelects(this.props.poem.wordLetters);
    this.props.updatePoemState({selected_texts: selects});
    if(this.props.poem.is_blank){
      alert("A blank poem? Really? \n\nGo click on some words.");
      return;
    }
    if(this.props.new){
      this.history.pushState(null, "/new/stylize");
    }else{
      var id = this.props.params.poemId;
      this.history.pushState(null, "/edit/"+id+"/create/stylize");
    }
  },
  componentDidMount: function(){
    setTimeout(function(){
      $(".toolbar").removeClass("pre-loading");
      $("h2, .hint").removeClass("pre-loading");
    },200);
  },
  componentWillUnmount: function(){
    $(".toolbar").addClass("pre-loading");
    $("h2, .hint").addClass("pre-loading");
  },
  toggleSelectWord: function(){
    this.props.updatePoemState({select_by_word: !this.props.poem.select_by_word});
  },
  selectByWord: function(){
    this.props.updatePoemState({select_by_word: true});
  },
  selectByLetter: function(){
    this.props.updatePoemState({select_by_word: false});
  },
  render: function () {
    var shuffleBtn = "";
    if(this.props.new){
      shuffleBtn = <div className="button shuffle" onClick={this.props.shufflePassage}>new passage</div>;
    }

    var nudgeBtn = this.props.poem.is_blank ? "nudge?" : "reset";
    var wordBtn = this.props.poem.select_by_word ? "select by letter?" : "select by word?";
    return(
      <div className="writerToolbar">
        select by
        <div><span className={this.props.poem.select_by_word ? "button wordBtnSelected" : "button notSelected"}
          onClick={this.selectByWord}>word</span>
        <span className={this.props.poem.select_by_word ? "button notSelected" : "button wordBtnSelected"}
          onClick={this.selectByLetter}>letter</span>
        </div>
        <div><span className="button nudge" onClick={this.props.handleNudge}>{nudgeBtn}</span></div>
        {shuffleBtn}
        <div><span className="button bigger" onClick={this.goToStyle}>next <i className="icon-arrow-right"></i></span></div>
      </div>
    );
  }
});
