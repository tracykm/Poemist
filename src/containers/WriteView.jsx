import React from 'react';
import { connect } from 'react-redux';
import { _getNewPassage, _getPoemAndMakeSelectable } from 'src/actions/ajax/poem';
import { _toggleSelectedLetters, _toggleSelectBy } from 'src/actions/selectablePoem.js';
import WriterToolbar from 'src/components/selectable/WriterToolbar';

import SelectablePoem from 'src/components/selectable/SelectablePoem';

class WriteView extends React.Component {
  componentWillMount() {
    // TODO: issue when going from '/edit/write/50' => '/new/write/'
    // component does not mount so newPassage not called
    const { params, getPoemAndMakeSelectable, getNewPassage } = this.props;
    const editPoemId = params.id;
    if (editPoemId) {
      getPoemAndMakeSelectable(editPoemId);
    } else {
      getNewPassage();
    }
  }

  render() {
    const { params, selectablePoem, toggleSelectedLetters, toggleSelectBy, getNewPassage } = this.props;
    const inEditView = !!params.id;
    const isSelectingByWord = selectablePoem.isSelectingByWord;
    const toolbarProps = { poemId: params.id, toggleSelectBy, inEditView, isSelectingByWord, getNewPassage };
    return (
      <div className="close-up-poem-view">
        <h1>{ inEditView ? 'Edit' : 'Write' }</h1>
        <h5>Make your own poem by clicking on words!</h5>
        <WriterToolbar {...toolbarProps} />
        <SelectablePoem selectablePoem={selectablePoem} toggleSelectedLetters={toggleSelectedLetters} />
      </div>
    );
  }
}

WriteView.propTypes = {
  selectablePoem: React.PropTypes.object,
  getNewPassage: React.PropTypes.func,
  toggleSelectedLetters: React.PropTypes.func,
  toggleSelectBy: React.PropTypes.func,
  params: React.PropTypes.object,
  getPoemAndMakeSelectable: React.PropTypes.func,
};

const mapDispatchToProps = {
  getNewPassage: _getNewPassage,
  getPoemAndMakeSelectable: _getPoemAndMakeSelectable,
  toggleSelectedLetters: _toggleSelectedLetters,
  toggleSelectBy: _toggleSelectBy,
};

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem,
    stylingPoem: state.stylingPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteView);
