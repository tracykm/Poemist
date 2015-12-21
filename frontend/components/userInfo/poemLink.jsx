var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  goToPoem(){
    window.scrollTo(0,0);
    this.history.pushState(null, "/poem/"+this.props.poem_id);
  },
  render: function () {
    return(
      <span className="link" onClick={this.goToPoem}>
        {this.props.text}
      </span>
    );
  }
});
