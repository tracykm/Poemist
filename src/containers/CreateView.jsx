import React from 'react';
import { connect } from 'react-redux';
import { getNewPassage } from 'src/actions/ajaxActions';
import { makeCurrentPoemSelectable, toggleSelectedLetters } from 'src/actions/simpleActions';
import WriterToolbar from 'src/containers/WriterToolbar';

import SelectablePoem from 'src/components/SelectablePoem';

class CreateView extends React.Component {
  componentWillMount() {
    const { makeCurrentPoemSelectable, getNewPassage, currentPoem } = this.props;
    if (currentPoem) {
      makeCurrentPoemSelectable(currentPoem);
    } else {
      getNewPassage();
    }
  }
  render() {
    const { selectablePoem, toggleSelectedLetters } = this.props;
    return (
      <div className="close-up-poem-view">
        <WriterToolbar onKeyDown={this.toggleSelectedLetters} />
        <SelectablePoem {...selectablePoem } toggleSelectedLetters={toggleSelectedLetters} />
      </div>
    );
  }
}

CreateView.propTypes = {
  selectablePoem: React.PropTypes.object,
  getNewPassage: React.PropTypes.func,
  makeCurrentPoemSelectable: React.PropTypes.func,
};

const mapDispatchToProps = {
  getNewPassage,
  makeCurrentPoemSelectable,
  toggleSelectedLetters,
};

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem,
    currentPoem: state.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
