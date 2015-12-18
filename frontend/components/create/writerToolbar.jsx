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
      var id = this.props.params.poemId
      this.history.pushState(null, "/edit/"+id+"/create/stylize");
    }
  },
  shufflePassage: function(){
    ApiUtil.getNewPassage();
  },
  render: function () {
    var shuffleBtn = "";
    if(this.props.new){
      shuffleBtn = <button onClick={this.shufflePassage}>shuffle</button>;
    }

    return(
      <div className="writerToolbar">
        <h4>Writing Toolbar</h4>
        {shuffleBtn}
        <br/>
        <button onClick={this.goToStyle}>Stylize></button>
      </div>
    );
  }
});
