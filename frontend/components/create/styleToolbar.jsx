var React = require('react');
var History = require('react-router').History;


module.exports = React.createClass({
  mixins: [History],
  goToStyling: function(){
    this.history.pushState(null, "/create/write");
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <button onClick={this.goToStyling}>Finish</button>
      </div>
    );
  }
});
