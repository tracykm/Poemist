var React = require('react');
var UserNav = require('../userInfo/userNav');
var ApiUtil = require('../../util/apiUtil');
var PoemStore = require('../../stores/poemStore');
var Poem = require('../poem');

module.exports = React.createClass({
  getInitialState: function () {
    return { poem: PoemStore.findPoem(this.props.params.poem_id) };
  },
  // componentWillReceiveProps: function () {
  //   ApiUtil.getPoem(this.props.params.poem_id);
  // },
  componentWillMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoem);
    ApiUtil.getPoem(this.props.params.poem_id);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoem: function (){
    this.setState({ poem: PoemStore.findPoem(this.props.params.poem_id) })
  },
  render: function () {
    var poem = ""
    if(typeof this.state.poem !== "undefined"){
      poem = <Poem poem={this.state.poem}/>
    }
    return(
      <div className="poemShowPage">
        {poem}
      </div>
    );
  }
});
