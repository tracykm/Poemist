var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  goToIndex: function(){
    this.history.pushState(null, "/");
  },

  render: function () {
    // var wisdom = this.generateWisdom();
    return(
      <div className="header">
        <h1 className="subtleLink" onClick={this.goToIndex}></h1>
        Write a found poem. It's good for you.
      </div>
    );
  }
});
