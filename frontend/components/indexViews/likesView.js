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
    var user = UserStore.find(window.current_user.id);
    var poems = [];
    if(user){
      poems = PoemStore.findPoems(user.liked_poem_ids);
    }
    return { user: user, poems: poems};
  },
  componentDidMount: function () {
    this.poemListener = PoemStore.addListener(this._updatePoems);
    this.userListener = UserStore.addListener(this._updateUser);
    ApiUtil.getLikedPoems(window.current_user.id);
    ApiUtil.getUser(window.current_user.id);
  },
  componentWillUnmount: function () {
    this.poemListener.remove();
    this.userListener.remove();
  },
  _updateUser: function (){
    this.setState({user: UserStore.find(window.current_user.id)});
    this._updatePoems();
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
        <h2>Poems You've Liked</h2>
        <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
