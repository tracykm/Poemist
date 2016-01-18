var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  render: function () {
    // var wisdom = this.generateWisdom();
    return(
      <div id="aboutPage">
        <h3>About</h3>
        <div id="aboutBanner">
          <div>A found poem is a poem that is composed <br/> with words and phrases from another text.</div>
        </div>

    <div className="one">
      <h3>Creativity thrives under constraints.</h3>
      <p> It may seem limiting to choose words only from a prearranged set,
          but limitations are one of the best drives of creativity.
        </p><p> For the sake of
          this website there are a set of very specific constraints on each poem.
          </p>
          <p>You will recieve exactly 1000 characters of text. </p><p>You may select any words or letters from this text
          to create your poem. </p><p>You cannot rearrange them. </p><p>Have fun! </p>
    </div>
      <div className="two">
        <h3>Treasure Hunting</h3>
          <p>
            The poems are easy to make and don't take much time, so have at it. Write 10
            and 1 or 2 will actually be quite interesting. </p><p>Discover your own accidental
            brilliance! </p><p>No pressure, no angst, just fun.
          </p>
        <h3>Contact</h3>
          <p>
            We would love to hear from you! Direct any comments or questions to
            info@poemist.net.
          </p>
      </div>
      </div>
    );
  }
});
