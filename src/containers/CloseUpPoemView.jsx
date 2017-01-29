import React from 'react';
import { connect } from 'react-redux';
import { getPoem } from 'src/actions/ajax/poem';
import Poem from 'src/components/poem/Poem.jsx';

import './_closeUpPoemView.scss';

class CloseUpPoemView extends React.Component {
  componentWillMount() {
    const { getPoem, params, poem } = this.props;
    if (!poem && params) {
      getPoem(params.id);
    }
  }
  render() {
    const { poem } = this.props;
    return (
      <div className="close-up-poem-view">
        {poem ? <Poem poem={poem} /> : 'loading'}
      </div>
    );
  }
}

CloseUpPoemView.propTypes = {
  params: React.PropTypes.object,
  poem: React.PropTypes.object,
  getPoem: React.PropTypes.func,
};

const mapDispatchToProps = {
  getPoem,
};

function mapStateToProps(state) {
  return {
    poem: state.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseUpPoemView);
