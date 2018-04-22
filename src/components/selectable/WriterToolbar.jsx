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
  const poem = inEditView
    ? props.poem
    : {
        passage: props.passage,
        wordLetters: props.wordLetters,
        id: poemId,
      }
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
        className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
        poem={poem}
      >
        {({ onClick }) => (
          <button
            onClick={onClick}
            className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
            data-test="styleLink"
          >
            Next <ArrowRightIcon />
          </button>
        )}
      </SavePoemButton>
    </div>
  )
}

export default WriterToolbar
