import React from 'react';
import { connect } from 'react-redux';
import { getIndexPoems } from 'src/actions/index';

import Poem from 'src/components/Poem.jsx';

import './_indexView.scss';

class IndexView extends React.Component {
  componentWillMount() {
    this.props.getIndexPoems();
  }
  render() {
    const { poems } = this.props;
    return (
      <div className="index-view">
        {poems ? poems.map((poem, i) => <Poem poem={poem} key={i} />) : 'loading'}
      </div>
    );
  }
}

IndexView.propTypes = {
  poems: React.PropTypes.array,
  getIndexPoems: React.PropTypes.func,
};

const mapDispatchToProps = {
  getIndexPoems,
};

function mapStateToProps(state) {
  return {
    poems: state.poems.listedPoems,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);
