var React = require('react');
var History = require('react-router').History;


module.exports = React.createClass({
  mixins: [History],
  goToIndex: function(){
    this.history.pushState(null, "/create/stylize");
  },
  render: function () {
    return(
      <div className="writerToolbar">
        <h4>Writing Toolbar</h4>
        <button onClick={this.goToIndex}>Stylize</button>
      </div>
    );
  }
});
