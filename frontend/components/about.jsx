var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  render: function () {
    // var wisdom = this.generateWisdom();
    return(
      <div>
        <h3>About</h3>
<p>A found poem is a poem that is composed from words and phrases found in another text.</p>
  <h3>Creativity thrives under constraints.</h3>
    <p> It may seem limiting to choose words only from a prearranged set,
      but limitations are one of the best drives of creativity. For the sake of
      this website there are a set of very specific constraints on each poem. You
      recieve 1500 characters, no more, no less. You may select any words or letters from this text
      to create your poem. You cannot rearrange them. </p>
      <h3>Treasure Hunting</h3>
        <p>
          The poems are easy to make and don't take much time, so have at it. Write 10
          and 1 or 2 will actually be quite interesting. Discover your own accidental
          brilliance. No pressure, no angst, just fun.
        </p>
      <h3>Contact</h3>
        <p>
          We would love to hear from you! Direct any comments or questions to
          info@poemist.net.
        </p>

      </div>
    );
  }
});
