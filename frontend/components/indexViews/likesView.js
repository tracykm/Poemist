var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var UserStore = require('../../stores/userStore.js');
var Poem = require('../poem');
var PoemsDisplay = require('./poemsDisplay');

module.exports = React.createClass({
  mixins: [History],
  goTo: function(url){
    this.history.pushState(null, url);
  },
  getInitialState: function () {
    var user = this.props.currentUser;
    var poems = [];
    if(user){
      poems = PoemStore.findPoems(user.liked_poem_ids);
    }
    return { user: user, poems: poems};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    if(this.state.user){
      ApiUtil.getLikedPoems(this.state.user.id);
    }

  },
  componentWillReceiveProps: function(newProps){
    if(newProps.user_id){
      ApiUtil.getLikedPoems(newProps.user_id);
    }
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
  },
  _updatePoems: function (){
    var poems = [];
    if(this.state.user){
      poems = PoemStore.findPoems(this.state.user.liked_poem_ids);
    }
    this.setState({poems: poems});
  },
  render: function () {
    var poems = this.state.poems;

    return(
      <div className="index">
        <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
