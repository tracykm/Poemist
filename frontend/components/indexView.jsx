var React = require('react');
var History = require('react-router').History;


module.exports = React.createClass({
  mixins: [History],
  goToCreate: function(){
    this.history.pushState(null, "/create");
  },
  render: function () {
    return(
      <div className="index">
        <h4>You are at the Index</h4>
        <button onClick={this.goToCreate}>Create Poem</button>
      </div>
    );
  }
});
