var React = require('react');
var History = require('react-router').History;
var ApiUtil = require('../../util/apiUtil.js');
var PoemStore = require('../../stores/poemStore.js');
var UserStore = require('../../stores/userStore.js');
var Poem = require('../singlePoem/poem.jsx');
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
    return { user: user, poems: poems, page: 1, areMorePoems: true};
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
      this.setState({poems: [], areMorePoems: true, page: 1});
      ApiUtil.getUser(nextProps.user_id);
      // this.loadNextPage();
    }
  },
  componentWillUnmount: function () {
    this.userListener.remove();
    this.poemListener.remove();
  },
  _updateUser: function (){
    var user = UserStore.find(this.props.user_id);
    // debugger
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
      this.setState({ poems: PoemStore.findPoems(this.state.user.poem_ids), areMorePoems: PoemStore.areMorePoems()});
    }
  },
  loadNextPage: function (){
    // user view
    if(this.state.user){
      ApiUtil.getUserPoems(this.state.user.id, this.state.page);
      this.setState({ page: this.state.page+1});
    }
  },
  render: function () {
    var username = (typeof this.state.user === 'undefined') ? "user" : this.state.user.username;
    var id = (typeof this.state.user === 'undefined') ? undefined : this.state.user.id;

    var num_likes = (typeof this.state.user === 'undefined') ? "" : this.state.user.liked_poem_ids.length;
    var num_poems = (typeof this.state.user === 'undefined') ? "" : this.state.user.poem_ids.length;
    var statuses = ["Intermittent Scribbler", "Novice Poeteer", "Thoughful Poet", "Pro", "Badass"];
    var status = statuses[Math.floor(num_poems/5)];
    if(!status){
      status = "badass";
    }
    var created_at = (typeof this.state.user === 'undefined') ? "" : this.state.user.created_at;
    created_at = formatDateNumbers(created_at);

    var likesLink;
    var currentUserPage = (this.props.currentUser && username === this.props.currentUser.username);
    if(currentUserPage){
      likesLink = (<span className="link" onClick={this.goTo.bind(this, "/mylikes")}> {num_likes} Poems Liked </span>);
    }else{
      likesLink = (<span className="link" onClick={this.goTo.bind(this, "/user/"+id+"/likes")}> {num_likes} Poems Liked </span>);
    }

    var title = ((currentUserPage) ? <h2>{"Your Profile"}</h2> : <h2>{username}s Poems</h2>);
    var description = "";
    if(this.state.user){
      description = this.state.user.description;
    }
    return(
      <div className="userProfile">
          {title}
          <div className="link" onClick={this.goTo.bind(this, "/")}>Browse Poems</div>
          <section className="stats">
            <div>
              <span className="left">{status} </span>
              <span className="right"> {num_poems} Poems Written  </span>
            </div>
            <br/>
            <div>
              <span className="left"> Since {created_at}  </span>
              <span className="right"> {likesLink} </span>
            </div>
            <div className="description clear-fix"> {description}</div>
          </section>
          <PoemsDisplay
            poems={this.state.poems}
            currentUser={this.props.currentUser}
            loadNextPage={this.loadNextPage}
            areMorePoems={this.state.areMorePoems}
            parent="userProfile"
            toggleShowLogin={this.props.toggleShowLogin}/>
      </div>
    );
  }
});

function formatDateWords(my_date){
  var formattedDate = new Date(my_date);
  var d = formattedDate.getDate();
  var m =  formattedDate.getMonth();
  // m += 1;  // JavaScript months are 0-11
  var y = formattedDate.getFullYear();
  var m_names = new Array("January", "February", "March",
    "April", "May", "June", "July", "August", "September",
    "October", "November", "December");

  return "" + m_names[m] + " " + d + ", " + y;
}
function formatDateNumbers(my_date){
  var formattedDate = new Date(my_date);
  var d = formattedDate.getDate();
  var m =  formattedDate.getMonth();
  m += 1;  // JavaScript months are 0-11
  var y = formattedDate.getFullYear();

  return (m + "/" + d + "/" + y);
}
