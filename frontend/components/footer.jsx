var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },

  render: function () {
    // var wisdom = this.generateWisdom();
    return(
      <footer>
        <span className="link" onClick={this.goTo.bind(this, "/")}>Index</span>
        <span className="link" onClick={this.goTo.bind(this, "/new/create")}>Create a Poem</span>
        <span className="link" onClick={this.goTo.bind(this, "/profile")}>My Profile</span>
        <span className="link" onClick={this.goTo.bind(this, "/about")}>About</span>
        <div>© Poemist 2016</div>
      </footer>
    );
  }
});
