import React from 'react'
import { Link } from 'react-router'

import './_toolbar.scss'

const WriterToolbar = ({ inEditView, poemId, getNewPassage, toggleSelectBy, isSelectingByWord }) => {
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
        onClick={getNewPassage}
        data-ux="get-new-passage"
      >
        new passage?
      </button>
      <Link
        className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
        to={{ pathname: nextUrl }}
      >
        Next <i className="icon-arrow-right"></i>
      </Link>
    </div>
  )
}

WriterToolbar.propTypes = {
  getNewPassage: React.PropTypes.func.isRequired,
  toggleSelectBy: React.PropTypes.func.isRequired,
  isSelectingByWord: React.PropTypes.bool,
  inEditView: React.PropTypes.bool,
  poemId: React.PropTypes.string, // TODO: should be number
}

export default WriterToolbar
