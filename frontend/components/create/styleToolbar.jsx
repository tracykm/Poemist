var React = require('react');
var History = require('react-router').History;


module.exports = React.createClass({
  mixins: [History],
  goToStyling: function(){
    this.history.pushState(null, "/");
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <h4>Styling Toolbar</h4>
        <button onClick={this.props.toggleCentered}>centered?</button>
        <br/>
        <button onClick={this.goToStyling}>Finish</button>
      </div>
    );
  }
});
