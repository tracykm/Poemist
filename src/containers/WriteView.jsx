import React from 'react';
import { connect } from 'react-redux';
import { getNewPassage } from 'src/actions/ajax/poem';
import { makeCurrentPoemSelectable, toggleSelectedLetters, toggleSelectBy } from 'src/actions/selectablePoem.js';
import WriterToolbar from 'src/components/selectable/WriterToolbar';

import SelectablePoem from 'src/components/selectable/SelectablePoem';

class WriteView extends React.Component {
  componentWillMount() {
    const { makeCurrentPoemSelectable, getNewPassage, currentPoem } = this.props;
    if (currentPoem) {
      makeCurrentPoemSelectable(currentPoem);
    } else {
      getNewPassage();
    }
  }
  render() {
    const { selectablePoem, toggleSelectedLetters, toggleSelectBy, getNewPassage } = this.props;
    const toolbarProps = { toggleSelectBy, isSelectingByWord: selectablePoem.isSelectingByWord, getNewPassage}
    return (
      <div className="close-up-poem-view">
        <h1>Write</h1>
        <WriterToolbar {...toolbarProps} />
        <SelectablePoem {...selectablePoem} toggleSelectedLetters={toggleSelectedLetters} />
      </div>
    );
  }
}

WriteView.propTypes = {
  selectablePoem: React.PropTypes.object,
  getNewPassage: React.PropTypes.func,
  makeCurrentPoemSelectable: React.PropTypes.func,
};

const mapDispatchToProps = {
  getNewPassage,
  makeCurrentPoemSelectable,
  toggleSelectedLetters,
  toggleSelectBy,
};

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem,
    currentPoem: state.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteView);
