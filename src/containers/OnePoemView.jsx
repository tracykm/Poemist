import React from 'react';
import { connect } from 'react-redux';
import { getPoem } from '../actions/index';

import Poem from '../components/Poem.jsx';

class OnePoemView extends React.Component {
  componentWillMount() {
    this.props.getPoem(this.props.id);
  }
  render() {
    const { poem } = this.props;
    return (
      <div>
        {poem ? <Poem poem={poem} /> : 'loading'}
      </div>
    );
  }
}

OnePoemView.propTypes = {
  poem: React.PropTypes.object,
  getPoem: React.PropTypes.func,
};

const mapDispatchToProps = {
  getPoem,
};

function mapStateToProps(state) {
  return {
    poems: state.poems.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePoemView);
