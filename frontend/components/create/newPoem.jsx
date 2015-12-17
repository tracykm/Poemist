var React = require('react');
var Poem = require('../poem.jsx');


module.exports = React.createClass({

  render: function () {
    return(
      <div className="newPoem">
        <Poem className="newPoem" poem={this.props.poem} />
      </div>
    );
  }

});
