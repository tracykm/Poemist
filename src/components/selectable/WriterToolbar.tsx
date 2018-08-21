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
        {selectablePoem.isSelectingByWord
          ? "select by letter?"
          : "select by word?"}
      </button>
      {!selectablePoem.id && (
        <button
          className="toolbar-tab"
          onClick={() => getNewPassage()}
          data-ux="get-new-passage"
        >
          new passage?
        </button>
      )}
      {!selectablePoem.id && (
        <button
          className="toolbar-tab"
          onClick={isBlank ? toggleRandomLetters : handleClear}
          data-ux="get-new-passage"
        >
          {isBlank ? "nudge" : "clear"}
        </button>
      )}
      <br />
      <SavePoemButton poem={selectablePoem}>
        {({ onClick }) => (
          <button
            onClick={onClick}
            className="toolbar-tab toolbar-tab-lg"
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
