var React = require('react');
var History = require('react-router').History;


module.exports = React.createClass({
  mixins: [History],
  goToStyling: function(){
    this.history.pushState(null, "/");
  },
  boo: function() {
    console.log(this.props.appState);
    this.props.toggleCentered;
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <h4>Styling Toolbar</h4>
        <button onClick={this.boo}>centered?</button>
        <br/>
        <button onClick={this.goToStyling}>Finish</button>
      </div>
    );
  }
});
