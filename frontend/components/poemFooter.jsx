var React = require('react');
var UserStore = require('../stores/userStore');
var Username = require('./userInfo/username');
var ApiUtil = require('../util/apiUtil');
var myMixables = require('../util/myMixables');

module.exports = React.createClass({
  getInitialState: function(){
    return ({currentUser: undefined});
  },
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._updateUser);
  },
  componentWillUnmount: function(){
    this.userListener.remove();
  },
  _updateUser: function(){
    var user = UserStore.currentUser();
    if(user){
      this.setState({currentUser: user});
    }
  },
  toggleLike: function(){
    ApiUtil.toggleLike({poem_id: this.props.poem.id, liker_id: window.current_user.id});
    this.forceUpdate();
    // find way to add poem to store and update
  },

  render: function () {
    var poem = this.props.poem;


    var num_likes = Object.keys(this.props.poem.likes).length;
    var likesClasses = "likes";
    if(this.state.currentUser){
      if(this.state.currentUser.liked_poem_ids.indexOf(poem.id) !== -1){
        likesClasses += " myLikes";
      }
    }
    var author = {id: this.props.poem.author_id, username: this.props.poem.author};

    var minutes = myMixables.timeSince(poem.created_at);
    var bottomMiddle = (<span className="timeAgo"> {minutes} </span>);
    if(this.props.inCreateView){
      bottomMiddle = (<span className="bookTitle">{this.props.poem.book_title}</span>);
    }

    return(
      <div className="poemFooter">
        -<Username className="authorName link" user={author}/>
      <span className="bottomMiddle">
        {bottomMiddle}
      </span>
        <span className={likesClasses} onClick={this.toggleLike}> ❤ {num_likes}</span>
      </div>
    );
  }
});
