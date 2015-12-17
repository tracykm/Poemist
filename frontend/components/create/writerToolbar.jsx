var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');


module.exports = React.createClass({
  mixins: [History],
  goToIndex: function(){
    this.history.pushState(null, "/create/stylize");
  },
  shufflePassage: function(){
    ApiUtil.getNewPassage();
  },
  render: function () {
    return(
      <div className="writerToolbar">
        <h4>Writing Toolbar</h4>
        <button onClick={this.shufflePassage}>shuffle</button>
        <br/>
        <button onClick={this.goToIndex}>Stylize></button>
      </div>
    );
  }
});
