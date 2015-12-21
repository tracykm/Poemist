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
    var user = UserStore.find(this.props.user_id);
    var poems = []
    if(user){
      poems = PoemStore.findPoems(user.poem_ids);
    }
    return { user: user, poems: poems};
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._updateUser);
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getUser(this.props.user_id);
  },
  componentWillReceiveProps: function (nextProps) {
    ApiUtil.getPoem(nextProps.params.poem_id);
  },
  componentWillUnmount: function () {
    this.userListener.remove();
    this.poemListener.remove();
  },
  _updateUser: function (){
    this.setState({ user: UserStore.find(this.props.user_id),
      poems: UserStore.getUsersPoems(this.props.user_id)});
    ApiUtil.getUserPoems(this.props.user_id);
  },
  _updatePoems: function (){
    this.setState({ poems: PoemStore.findPoems(this.state.user.poem_ids)});
  },
  render: function () {
    var poems = this.state.poems;
    var username = (typeof this.state.user === 'undefined') ? "-" : this.state.user.username;
    return(
      <div className="userProfile">
          <h2>{username}s Poems</h2>
          <button onClick={this.goTo.bind(this, "new/create")}>Create</button>
          <button onClick={this.goTo.bind(this, "/")}>Index</button>
          <button onClick={this.goTo.bind(this, "/mylikes")}>View Likes</button>
          <PoemsDisplay poems={poems} />
      </div>
    );
  }
});
