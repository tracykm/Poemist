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
    return { user: user, poems: poems, page: 1};
  },
  componentDidMount: function () {
    if(this.props.user_id){
      ApiUtil.getUser(this.props.user_id);
      this.loadNextPage();
    }
    this.userListener = UserStore.addListener(this._updateUser);
    this.poemListener = PoemStore.addListener(this._updatePoems);
  },
  componentWillReceiveProps: function (nextProps) {
    if(nextProps.user_id !== this.props.user_id){
      // New Props
      ApiUtil.getUser(nextProps.user_id);
      this.loadNextPage();
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
      if(this.state.page < 2){
        this.loadNextPage();
      }
    }
  },
  _updatePoems: function (){
    if(this.state.user){
      this.setState({ poems: PoemStore.findPoems(this.state.user.poem_ids)});
    }
  },
  loadNextPage: function (){
    if(this.state.user){
      ApiUtil.getUserPoems(this.state.user.id, this.state.page);
      this.setState({ page: this.state.page+1 });
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
          <span className="link" onClick={this.goTo.bind(this, "/mylikes")}> {num_likes} Liked Poems </span>
          <div> self description: {description}</div>
          <PoemsDisplay poems={this.state.poems} currentUser={this.props.currentUser} loadNextPage={this.loadNextPage}/>
      </div>
    );
  }
});
