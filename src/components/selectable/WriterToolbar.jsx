import React from 'react'
import { Link } from 'react-router-dom'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right'

import './_toolbar.scss'

const WriterToolbar = ({
  clearSelects,
  isBlank,
  inEditView,
  poemId,
  handleFetchNewPassage,
  toggleSelectBy,
  isSelectingByWord,
  toggleRandomLetters,
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
        onClick={isBlank ? toggleRandomLetters : clearSelects}
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
        Next <ArrowRightIcon />
      </Link>
    </div>
  )
}

export default WriterToolbar
