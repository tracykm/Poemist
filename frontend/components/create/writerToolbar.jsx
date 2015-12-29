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
  selectByWord: function(){
    this.props.updatePoemState({select_by_word: true});
  },
  selectByLetter: function(){
    this.props.updatePoemState({select_by_word: false});
  },
  render: function () {
    var shuffleBtn = "";
    if(this.props.new){
      shuffleBtn = <button onClick={this.shufflePassage}>change passage</button>;
    }

    var nudgeBtn = this.props.poem.is_blank ? "nudge?" : "reset";
    var wordBtn = this.props.poem.select_by_word ? "select by letter?" : "select by word?";
    return(
      <div className="writerToolbar">
        <h4>Writing Toolbar</h4>
        select by
        <br/>
        <button className={this.props.poem.select_by_word ? "wordBtnSelected" : ""}
          onClick={this.selectByWord}>word</button>
        <button className={this.props.poem.select_by_word ? "" : "wordBtnSelected"}
          onClick={this.selectByLetter}>letter</button>
        <br/>
        <button onClick={this.props.handleNudge}>{nudgeBtn}</button>
        <br/>
        {shuffleBtn}
        <br/>
        <button className="bigger" onClick={this.goToStyle}>next▶</button>
      </div>
    );
  }
});
