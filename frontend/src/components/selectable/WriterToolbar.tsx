import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import SavePoemButton from "./SavePoemButton";
import ToolbarDiv from "./ToolbarDiv";
import { ISelectablePoem, IWordLetter } from "../types";

interface IProps {
  handleClear: () => void;
  getNewPassage: () => void;
  toggleSelectBy: () => void;
  toggleRandomLetters: () => void;
  selectablePoem: ISelectablePoem;
}

function getIsBlank(wordLetters: IWordLetter[][]) {
  return wordLetters.every(word => word.every(letter => !letter.isSelected));
}

const WriterToolbar = ({
  handleClear,
  getNewPassage,
  toggleSelectBy,
  toggleRandomLetters,
  selectablePoem,
  ...props
}: IProps) => {
  const isBlank = getIsBlank(selectablePoem.wordLetters);
  return (
    <ToolbarDiv className="writer-toolbar toolbar">
      <button
        className="toolbar-tab"
        onClick={toggleSelectBy}
        data-ux="toggle-select-by"
      >
        <span className="text">
          {selectablePoem.isSelectingByWord
            ? "select by letter?"
            : "select by word?"}
        </span>
      </button>
      {!selectablePoem.id && (
        <button
          className="toolbar-tab"
          onClick={() => getNewPassage()}
          data-ux="get-new-passage"
        >
          <span className="text">new passage?</span>
        </button>
      )}
      {!selectablePoem.id && (
        <button
          className="toolbar-tab"
          onClick={isBlank ? toggleRandomLetters : handleClear}
          data-ux="get-new-passage"
        >
          <span className="text">{isBlank ? "nudge" : "clear"}</span>
        </button>
      )}
      <SavePoemButton poem={selectablePoem}>
        {({ onClick }) => (
          <button
            onClick={onClick}
            className="toolbar-tab toolbar-tab-lg"
            data-test="styleLink"
          >
            <span className="text">Next</span> <FaArrowRight />
          </button>
        )}
      </SavePoemButton>
    </ToolbarDiv>
  );
};

export default WriterToolbar;
