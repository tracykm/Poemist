import React from 'react';
import { connect } from 'react-redux';
import { toggleSelectBy } from 'src/actions/simpleActions';
import { getNewPassage } from 'src/actions/ajaxActions';

const WriterToolbar = ({ getNewPassage, toggleSelectBy, isSelectingByWord }) => (
  <div className="writer-toolbar">
    <button onClick={toggleSelectBy}>
      {isSelectingByWord ? 'select by letter?' : 'select by word?'}
    </button>
    <button onClick={getNewPassage}>
      New Passage?
    </button>
  </div>
);

WriterToolbar.propTypes = {
  getNewPassage: React.PropTypes.func,
  toggleSelectBy: React.PropTypes.func,
  isSelectingByWord: React.PropTypes.boolean,
};

function mapStateToProps(state) {
  return {
    isSelectingByWord: state.selectablePoem.isSelectingByWord,
  };
}

export default connect(mapStateToProps, { toggleSelectBy, getNewPassage })(WriterToolbar);
