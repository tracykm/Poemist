import React from 'react';
import { connect } from 'react-redux';
import { getNewPassage } from 'src/actions/ajaxActions';
import { makePoemUnselectable } from 'src/actions/simpleActions';
import WriterToolbar from 'src/containers/WriterToolbar';
import CloseUpPoemView from 'src/containers/CloseUpPoemView.jsx';

class StyleView extends React.Component {
  componentWillMount() {
    const { makePoemUnselectable, selectablePoem } = this.props;
    if (selectablePoem) {
      makePoemUnselectable(selectablePoem);
    } else {
      getNewPassage();
    }
  }

  render() {
    const { poem } = this.props;
    return (
      <div className="close-up-poem-view">
        <h1>Stylize</h1>
        <WriterToolbar onKeyDown={this.toggleSelectedLetters} />
        <CloseUpPoemView poem={poem} />
      </div>
    );
  }
}

StyleView.propTypes = {
  selectablePoem: React.PropTypes.object,
  makeCurrentPoemSelectable: React.PropTypes.func,
};

const mapDispatchToProps = {
  makePoemUnselectable,
};

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem,
    currentPoem: state.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleView);
