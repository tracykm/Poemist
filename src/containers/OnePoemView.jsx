import React from 'react';
import { connect } from 'react-redux';
import { getPoem } from '../actions/index';

import './_onePoemView.scss';
import Poem from '../components/Poem.jsx';

class OnePoemView extends React.Component {
  componentWillMount() {
    this.props.getPoem(this.props.params.id);
  }
  render() {
    const { poem } = this.props;
    return (
      <div className="one-poem-view">
        {poem ? <Poem poem={poem} /> : 'loading'}
      </div>
    );
  }
}

OnePoemView.propTypes = {
  params: React.PropTypes.object,
  poem: React.PropTypes.object,
  getPoem: React.PropTypes.func,
};

const mapDispatchToProps = {
  getPoem,
};

function mapStateToProps(state) {
  return {
    poem: state.poems.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnePoemView);
