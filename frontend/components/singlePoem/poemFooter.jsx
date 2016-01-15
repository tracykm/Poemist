var React = require('react');
var UserStore = require('../../stores/userStore');
var Username = require('.././userNav/username');
var ApiUtil = require('../../util/apiUtil');
var myMixables = require('../../util/myMixables');

module.exports = React.createClass({
  getInitialState: function(){
    return ({currentUser: UserStore.currentUser()});
  },
  componentWillReceiveProps: function(newProps){
    if(newProps.currentUser){
      this.setState({currentUser: UserStore.currentUser()});
    }
  },
  toggleLike: function(){
    if(this.props.currentUser){
      ApiUtil.toggleLike({poem_id: this.props.poem.id, liker_id: this.props.currentUser.id});
      this.forceUpdate();
    }else{
      this.props.toggleShowLogin("Log in to like a poem.");
    }
    // find way to add poem to store and update
  },

  render: function () {
    var poem = this.props.poem;


    var num_likes = Object.keys(this.props.poem.likes).length;
    var likesClasses = "likes subtleLink";
    if(this.state.currentUser){
      if(this.state.currentUser.liked_poem_ids.indexOf(poem.id) !== -1){
        likesClasses += " myLikes";
      }
    }
    var author = {id: this.props.poem.author_id, username: this.props.poem.author};

    var minutes = myMixables.timeSince(poem.created_at);
    var bottomMiddle;
    if(this.props.inCreateView){
      bottomMiddle = (
        <span className="bottomMiddle">
          <span className="bookTitle">
            {"From: " + this.props.poem.book_title}
          </span>
        </span>);
    }else{
      bottomMiddle = (
      <span className="bottomMiddle">
        <Username className="authorName link" user={author}/>
        <span className={likesClasses} onClick={this.toggleLike}>
           ❤{num_likes}
         </span>
         <span className="timeAgo">
           {minutes + " ago"}
         </span>
      </span>);
    }

    return(
      <div className="poemFooter">
        {bottomMiddle}
      </div>
    );
  }
});
