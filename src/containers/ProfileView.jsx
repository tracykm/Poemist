import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import { getUserPoems } from 'src/actions/ajax/poem';
import IndexView from 'src/containers/IndexView.jsx';

class ProfileView extends React.Component {
  constructor() {
    super();
    this.getMorePoems = this.getMorePoems.bind(this);
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
    const { poems, getUserPoems, allPoemsLoaded } = this.props;
    return (
      <div className="index-view">
        <h5>Look at all the lovely poems you have written!</h5>
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
  allPoemsLoaded: React.PropTypes.bool,
};

const mapDispatchToProps = {
  getUserPoems,
};

function mapStateToProps(state) {
  const userId = state.current.userId;
  let poems = [];
  let allPoemsLoaded;
  if (userId) {
    // ugly beacuse any could be undefined
    poems = filter(state.poems, (poem => poem.authorId === userId));
    allPoemsLoaded = state.users[userId] && state.users[userId].allPoemsLoaded;
  }
  return {
    poems,
    userId,
    allPoemsLoaded,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
