var React = require('react');
var ApiUtil = require('../../util/apiUtil.js');
var BookStore = require('../../stores/bookStore.js');
var PoemSelectable = require('../singlePoem/poemSelectable.jsx');
var Poem = require('../singlePoem/poem.jsx');
var PoemStore = require('../../stores/poemStore.js');
var myMixables = require('../../util/myMixables');
var selectMixable = require('../../util/selectMixable');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Lifecycle = require('react-router').Lifecycle;
const { connect } = require('react-redux');
const { getNewPassage } = require('../../actions/index');

const CreateView = React.createClass({
   mixins: [ Lifecycle ],

  getInitialState: function () {
    var is_blank = this.props.new;
    return {letters: {}, centered: false, select_by_word: true,
    passage_length: 1000, is_blank: is_blank, likes: {}, color_range: 0,
    background_id: 0};
  },

  routerWillLeave: function(nextLocation) {
    if (!this.finishedPoem){
      return ('Your work is not saved! Are you sure you want to leave?');
    }
  },


  getPoem: function () {
    var id = this.props.params.poemId;
    var poem = PoemStore.findPoem(id);
    if(poem){
      poem.centered = false;
      this.setState(poem);
      var wordLetters = this.formatLetters(poem.passage);
      poem.wordLetters = wordLetters;
      this.setState(poem);
    }
  },

  componentDidMount: function () {
    // $(".createView.write").addClass("pre-loading");
    $(".createView .toolbar").addClass("pre-loading");
    // setTimeout(function(){
    //   $(".createView.write").removeClass("pre-loading");
    // },10)
    setTimeout(function(){
      $(".createView .toolbar").removeClass("pre-loading");
    },500);
    if(this.props.new){
      this.bookListener = BookStore.addListener(this._updatePassage);
      ApiUtil.getNewPassage();
    }else{
      var id = this.props.params.poemId;
      ApiUtil.getPoem(id);
      this.bookListener = PoemStore.addListener(this.getPoem);
    }
    this.shiftDownListener = document.addEventListener('keydown', this._setShiftDown);
    this.shiftUpListener = document.addEventListener('keyup', this._setShiftUp);
  },
  shufflePassage: function() {
    this.setState({wordLetters: []}); // clear passage while you see loading
    ApiUtil.getNewPassage();
    this.props.getNewPassage();
    debugger
    $(".poemText").removeClass("pre-loading");
  },
  _setShiftDown: function(event){
    if(event.keyCode === 16 || event.charCode === 16){
        this.setState({select_by_word: !this.state.select_by_word});
    }
  },
  _setShiftUp: function(event){
    if(event.keyCode === 16 || event.charCode === 16){
        this.setState({select_by_word: !this.state.select_by_word});
    }
  },

  componentWillUnmount: function () {
    this.bookListener.remove();
    document.removeEventListener('keydown', this._setShiftDown);
    document.removeEventListener('keyup', this._setShiftUp);
  },

  _updatePassage: function (passageObj) {
    passageObj = BookStore.all();
    var newPassage = passageObj.text;

    this.setState({
      passage: newPassage,
      book_id: passageObj.id,
      book_title: passageObj.title,
    });

    this.resetSelected(this.state.passage);
  },
  fadeIn: function(){
    var ul = $(".poemText");
    if(!ul){
      return;
    }
    $(".poemText span").each(function(i){
      // $(this).addClass("fadingIn")
    });
    function fadeInLi(i){
      var poemSpans = $(".poemText span");
      if (i < poemSpans.length) {
        var li = poemSpans[i];
        if(li.className !== ""){
          li.className = "";
          if(i%10 === 0){
            fadeInLi(i+1);
          }else{
            setTimeout(function(){
              fadeInLi(i+1);
            }, 10);
          }
        }else{
          fadeInLi(i+1);
        }
      }
    }
    // fadeInLi(0);
  },
  splitWords : function(passage){
    var words = [];
    var word = "";
    // var startIdx = 0;
    passage.split("").forEach(function(ch, idx){
      word += ch;
      if(ch === " " || ch === "-"){
        words.push(word);
        word = "";
        // startIdx = idx;
      }
    });
    words.push(word); // last few letters with no space after
    return words;
  },

  formatLetters: function(passage){
    // passage = passage.substring(0, this.state.passage_length);
    var that = this;
    var wordArr = this.splitWords(passage);
    var idx = -1;
    var wordLetters = wordArr.map(function(word){
      return word.split("").map(function(letter){
        idx++;
        var is_selected = selectMixable.isHighlighted(that.state.selected_texts, idx);
        return {ch: letter, is_selected: is_selected};
      });
    });
    return wordLetters;
  },

  insStylize: function(){
    return (this.props.location.pathname.split("/").pop() === "stylize");
  },
  handleClick: function(e){
    var letterIdx = e.target.getAttribute("data-idx");
    if(letterIdx){ // protects agianst blank space click - still worked but error messages
      var wordIdx = e.target.parentElement.getAttribute("data-word-idx");
      if(!this.insStylize() && this.state.wordLetters){
        if(this.state.select_by_word){
          this.wordClicked(wordIdx, letterIdx);
        }else{
          this.letterClicked(wordIdx, letterIdx);
        }
      }
    }
  },

  letterClicked: function(wordIdx, letterIdx){
    var wordLetters = this.state.wordLetters;
    var opposite = !wordLetters[wordIdx][letterIdx].is_selected;
    wordLetters[wordIdx][letterIdx].is_selected = opposite;
    this.setState({wordLetters: wordLetters, is_blank: false});
  },

  wordClicked: function(wordIdx, letterIdx){
    var wordLetters = this.state.wordLetters;
    var opposite = !wordLetters[wordIdx][letterIdx].is_selected;
    wordLetters[wordIdx].forEach(function(letter){
      letter.is_selected = opposite;
    });
    this.setState({wordLetters: wordLetters, is_blank: false});
  },

  handleNudge: function (){
    if(this.state.is_blank){
      this.selectRandomWords();
    }else{
      this.resetSelected(this.state.passage);
    }
  },

  resetSelected: function (passage){
    // passage = passage.substring(0, this.state.passage_length);
    if(passage){
      var wordArr = this.splitWords(passage);
      var wordLetters = wordArr.map(function(word){
        return word.split("").map(function(letter){
          return {ch: letter, is_selected: false};
        });
      });
      this.setState({wordLetters: wordLetters, is_blank: true});
    }
  },


  selectRandomWords: function (){
    var length = this.state.wordLetters.length;
    for (var i = 0; i < 12; i++) {
      var idx = Math.floor((Math.random() * length));
      this.wordClicked(idx, 0);
    }
    this.setState({is_blank: false});
  },


  updatePoemState: function (newState) {
    this.setState(newState);
  },

  finishPoem: function(){
    console.log("finishPoem");
    this.finishedPoem = true;
  },

  render: function () {
    const inStylize = this.insStylize()
    var currentPoem = this.state;
    currentPoem.passage = this.props.currentPassage;

    var classes = "createView ";
    var titleText = this.props.new ? "Create" : "Edit";

    var poemDiv;
    var hint = "";
    if(inStylize){
      titleText = "Stylize";
      classes += "stylize";
      poemDiv = (<Poem className="newPoem"
                inCreateView={true} inStylize={inStylize}
                poem={currentPoem} />);
      hint = (<div className='hint'>Go on, add a lovely filter</div>);
    }else{
      classes += "write";
      poemDiv = (<PoemSelectable className="newPoem"
                inCreateView={true} inStylize={inStylize}
                poem={currentPoem} />);
      hint = (<div className='hint'>*hold shift to temporarily switch selection mode</div>);
    }

    this.getPoem();

    return(
      <div className={classes}>
        <h2>{titleText}</h2>
        {hint}
        <div className="toolbar" toggleCentered={currentPoem}>
          {React.cloneElement(this.props.children,
            { poem: currentPoem,
              new: this.props.new,
              inStylize: inStylize,
              currentUser: this.props.currentUser,
              updatePoemState: this.updatePoemState,
              handleNudge: this.handleNudge,
              shufflePassage: this.shufflePassage,
              toggleShowLogin: this.props.toggleShowLogin,
              finishPoem: this.finishPoem
            })}
          </div>
        <div className="createPoem " onClick={this.handleClick}>
          {poemDiv}
        </div>
      </div>
    );
  }
});


const mapDispatchToProps = {
  getNewPassage,
}

function mapStateToProps(state) {
  return {
    currentPassage: state.passage
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateView);