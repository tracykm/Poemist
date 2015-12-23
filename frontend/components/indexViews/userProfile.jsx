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
    var poems = [];
    if(user){
      poems = PoemStore.findPoems(user.poem_ids);
    }
    return { user: user, poems: poems};
  },
  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._updateUser);
    this.poemListener = PoemStore.addListener(this._updatePoems);
    ApiUtil.getUser(this.props.user_id);
    ApiUtil.getUserPoems(this.props.user_id);
  },
  componentWillReceiveProps: function (nextProps) {
    if(nextProps.user_id !== this.props.user_id){
      // New Props
      ApiUtil.getUser(nextProps.user_id);
      ApiUtil.getUserPoems(nextProps.user_id);
    }
  },
  componentWillUnmount: function () {
    this.userListener.remove();
    this.poemListener.remove();
  },
  _updateUser: function (){
    var user = UserStore.find(this.props.user_id);
    if(user){
      this.setState({ user: user,
        poems: PoemStore.findPoems(user.poem_ids)});
    }
  },
  _updatePoems: function (){
    if(this.state.user){
      this.setState({ poems: PoemStore.findPoems(this.state.user.poem_ids)});
    }
  },
  render: function () {
    var username = (typeof this.state.user === 'undefined') ? "user" : this.state.user.username;
    var num_likes = (typeof this.state.user === 'undefined') ? "" : this.state.user.liked_poem_ids.length;
    var num_poems = (typeof this.state.user === 'undefined') ? "" : this.state.user.poem_ids.length;
    var statuses = ["intermittent scribbler", "novice poeteer", "pro", "badass"];
    var status = statuses[Math.floor(num_poems/5)];

    var title = ((username === window.current_user.username) ? "" : <h2>{username}s Poems</h2>);
    var description = "";
    if(this.state.user){
      description = this.state.user.description;
    }
    return(
      <div className="userProfile">
          {title}
          <span>status: {status} </span> ∙ ∙
          <span> {num_poems} Poems </span> ∙ ∙
          <span className="link" onClick={this.goTo.bind(this, "/mylikes")}> {num_likes} Liked Poems </span> ∙ ∙
          <span> self description: {description}</span>
          <PoemsDisplay poems={this.state.poems} currentUser = {this.props.currentUser}/>
      </div>
    );
  }
});
