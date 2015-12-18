var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  goToCreate: function(){
    this.history.pushState(null, "/create");
    if(this.props.centered){
      this.props.toggleCentered();
    }
  },
  render: function () {
    return(
      <div className="styleToolbar">
        <h4>Styling Toolbar</h4>
        <button onClick={this.props.toggleCentered}>centered?</button>
        <br/>
        <button onClick={this.goToCreate}>B</button>
        <button onClick={this.goTo.bind(this, "/")}>Finish></button>
      </div>
    );
  }
});
