var React = require('react');
var UserNav = require('../userNav/userNav');
var ApiUtil = require('../../util/apiUtil');
var PoemStore = require('../../stores/poemStore');
var Poem = require('../singlePoem/poem.jsx');
const { connect } = require('react-redux');
const { bindActionCreators } = require('redux');

const PoemShowView = React.createClass({
  getInitialState: function () {
    return { poem: PoemStore.findPoem(this.props.params.poem_id) };
  },
  goTo: function(url){
    this.history.pushState(null, url);
  },
  componentWillReceiveProps: function (nextProps) {
    ApiUtil.getPoem(nextProps.params.poem_id);
  },
  componentWillMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoem);
    ApiUtil.getPoem(this.props.params.poem_id);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoem: function (){
    this.setState({ poem: PoemStore.findPoem(this.props.params.poem_id) });
  },
  render: function () {
    var poem = "";
    if(typeof this.state.poem !== "undefined"){
      poem = (<Poem
        poem={this.state.poem}
        inDetailView={true}
        toggleShowLogin={this.props.toggleShowLogin}
        currentUser={this.props.currentUser}
      />);
    }
    var author = (typeof this.state.poem !== "undefined")  ? this.state.poem.author : "";
    return(
      <div className="poemShowPage">
        <h2>{author}'s Poem</h2>
      <br/>
        {poem}
      </div>
    );
  }
});

module.exports = PoemShowView;