var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  render: function () {
    // var wisdom = this.generateWisdom();
    return(
      <div>
        <h3>about</h3>
      </div>
    );
  }
});
