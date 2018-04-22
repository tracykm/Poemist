import React from 'react'
import { Link } from 'react-router-dom'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right'
import SavePoemButton from './SavePoemButton'

import './_toolbar.scss'

const WriterToolbar = ({
  handleClear,
  isBlank,
  inEditView,
  poemId,
  getNewPoem,
  toggleSelectBy,
  isSelectingByWord,
  toggleRandomLetters,
  ...props
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
        onClick={() => getNewPoem()}
        data-ux="get-new-passage"
      >
        new passage?
      </button>
      <button
        className="toolbar-tab toolbar-tab-btn"
        onClick={isBlank ? toggleRandomLetters : handleClear}
        data-ux="get-new-passage"
      >
        {isBlank ? 'nudge' : 'clear'}
      </button>
      <br />
      <SavePoemButton
        {...{ passage: props.passage, wordLetters: props.wordLetters }}
      />
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
