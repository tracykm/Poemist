import React from 'react';
import { connect } from 'react-redux';
import { getIndexPoems } from 'src/actions/ajax/poem';
import { Link } from 'react-router';
import { values } from 'lodash';

import Poem from 'src/components/poem/Poem.jsx';

import './_indexView.scss';

class IndexView extends React.Component {
  componentWillMount() {
    this.props.getIndexPoems();
  }
  render() {
    const { poems, currentUserId } = this.props;
    return (
      <div className="index-view">
        {poems ? poems.map((poem, i) => (
          <Poem poem={poem} isCurrentUser={currentUserId === poem.authorId} key={i} />
        )) : 'loading'}
      </div>
    );
  }
}

IndexView.propTypes = {
  poems: React.PropTypes.array,
  getIndexPoems: React.PropTypes.func,
  currentUserId: React.PropTypes.number,
};

const mapDispatchToProps = {
  getIndexPoems,
};

function mapStateToProps(state) {
  return {
    poems: values(state.poems).reverse(), // make oldest to newest
    currentUserId: state.current.userId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);
