import React from 'react'
import { Link } from 'react-router-dom'

import './_toolbar.scss'

const WriterToolbar = ({
  clearSelects,
  isBlank,
  inEditView,
  poemId,
  handleFetchNewPassage,
  toggleSelectBy,
  isSelectingByWord,
}) => {
  const nextUrl = inEditView ? `/edit/stylize/${poemId}` : '/new/stylize'
  return (
    <div className="writer-toolbar toolbar">
      <button
        className="toolbar-tab toolbar-tab-btn"
        onClick={toggleSelectBy}
        data-ux="toggle-select-by"
      >
        {isSelectingByWord ? 'select by letter?' : 'select by word?'}
      </button>
      <button
        className="toolbar-tab toolbar-tab-btn"
        onClick={handleFetchNewPassage}
        data-ux="get-new-passage"
      >
        new passage?
      </button>
      <button
        className="toolbar-tab toolbar-tab-btn"
        onClick={clearSelects}
        data-ux="get-new-passage"
      >
        {isBlank ? 'nudge' : 'clear'}
      </button>
      <br />
      <Link
        className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
        to={nextUrl}
        data-test="styleLink"
      >
        Next <i className="icon-arrow-right" />
      </Link>
    </div>
  )
}

WriterToolbar.propTypes = {
  handleFetchNewPassage: React.PropTypes.func.isRequired,
  toggleSelectBy: React.PropTypes.func.isRequired,
  isSelectingByWord: React.PropTypes.bool,
  inEditView: React.PropTypes.bool,
  poemId: React.PropTypes.string, // TODO: should be number
}

export default WriterToolbar
