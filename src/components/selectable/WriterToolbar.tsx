import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import SavePoemButton from "./SavePoemButton";
import ToolbarDiv from "./ToolbarDiv";

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
        id: poemId
      };
  return (
    <ToolbarDiv className="writer-toolbar toolbar">
      <button
        className="toolbar-tab toolbar-tab-btn"
        onClick={toggleSelectBy}
        data-ux="toggle-select-by"
      >
        {isSelectingByWord ? "select by letter?" : "select by word?"}
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
        {isBlank ? "nudge" : "clear"}
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
            Next <FaArrowRight />
          </button>
        )}
      </SavePoemButton>
    </ToolbarDiv>
  );
};

export default WriterToolbar;
