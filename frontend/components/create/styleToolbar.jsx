var React = require('react');
var Slider = require('./slider');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');

var NUM_STYLES = 10;

module.exports = React.createClass({
  mixins: [History],
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
  finishPoem: function(){
    var poem = this.props.poem;
    if(this.props.new){
      ApiUtil.createPoem(poem);
    }else{
      ApiUtil.updatePoem(poem);
    }
    this.history.pushState(null, "/");
  },
  updateStyle: function(e){
    var styleNum = e.target.value;
    this.props.updatePoemState({color_range: styleNum});
  },
  stylePrev: function(){
    var newStyle = this.props.poem.color_range - 1;
    if(newStyle < 0){
      newStyle = NUM_STYLES - 1;
    }
    this.props.updatePoemState({color_range: newStyle});
  },
  styleNext: function(){
    var newStyle = this.props.poem.color_range + 1;
    newStyle = newStyle % NUM_STYLES;
    this.props.updatePoemState({color_range: newStyle});
  },
  toggleCentered: function(e){
    this.props.updatePoemState({centered: !this.props.poem.centered});
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <h4>Styling Toolbar</h4>
        Filter:<br/>
        <span className="link" onClick={this.stylePrev}>◀</span>
      <input type="number" onChange={this.updateStyle} min="0" max="10" value={this.props.poem.color_range}></input>
          <span className="link" onClick={this.styleNext}>▶</span>
        <br/>
        <button onClick={this.toggleCentered}>centered?</button>
        <br/>
        <button onClick={this.goToCreate}>◀</button>
        <button className="bigger" onClick={this.finishPoem}>Finish▶</button>
      </div>
    );
  }
});
