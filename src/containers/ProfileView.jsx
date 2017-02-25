import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { getUserPoems } from 'src/actions/ajax/poem';
import { getUser } from 'src/actions/ajax/user';
import IndexView from 'src/containers/IndexView.jsx';

class ProfileView extends React.Component {
  constructor() {
    super();
    this.getMorePoems = this.getMorePoems.bind(this);
  }
  componentDidMount() {
    const { userId } = this.props;
    this.props.getUser(userId);
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getMorePoems(0);
    }
  }
  getMorePoems(page) {
    const { userId, getUserPoems } = this.props;
    if (userId) {
      getUserPoems({ userId, page });
    }
  }
  render() {
    const { poems, user, userId, currentUserId, allPoemsLoaded } = this.props;
    const pronoun = (currentUserId === userId) ? 'you' : 'they';
    return (
      <div className="index-view">
        <h1>{user && user.username}</h1>
        <h5>Look at all the lovely poems {pronoun} have written!</h5>
        <IndexView
          poems={poems}
          getMorePoems={this.getMorePoems}
          allPoemsLoaded={allPoemsLoaded}
        />
      </div>
    );
  }
}

ProfileView.propTypes = {
  poems: React.PropTypes.array,
  getUserPoems: React.PropTypes.func,
  getUser: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
  userId: React.PropTypes.number,
  currentUserId: React.PropTypes.number,
  user: React.PropTypes.object,
};

const mapDispatchToProps = {
  getUserPoems,
  getUser,
};

function mapStateToProps(state) {
  const currentUserId = state.current.userId;
  const path = state.routing.locationBeforeTransitions.pathname;
  const userId = JSON.parse(path.split('/')[2]);
  let poems = [];
  let allPoemsLoaded;
  let user;
  if (userId) {
    // ugly beacuse any could be undefined
    poems = filter(state.poems, (poem => poem.authorId === userId));
    allPoemsLoaded = state.users[userId] && state.users[userId].allPoemsLoaded;
    user = state.users[userId];
  }
  return {
    poems,
    userId,
    user,
    currentUserId,
    allPoemsLoaded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
