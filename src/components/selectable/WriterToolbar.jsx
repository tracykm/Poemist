import React from 'react'
import { Link } from 'react-router'

import './_toolbar.scss'

const WriterToolbar = ({ inEditView, poemId, getNewPassage, toggleSelectBy, isSelectingByWord }) => {
  const nextUrl = inEditView ? `/edit/stylize/${poemId}` : '/new/stylize'
  return (
    <div className="writer-toolbar toolbar">
      <button className="button" onClick={toggleSelectBy} data-ux="toggle-select-by">
        {isSelectingByWord ? 'select by letter?' : 'select by word?'}
      </button>
      <button className="button" onClick={getNewPassage} data-ux="get-new-passage">
        New Passage?
      </button>
      <button className="button">
        <Link to={{ pathname: nextUrl }}>Next</Link>
      </button>
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
