import * as React from "react";
import { FaArrowRight } from "react-icons/fa";
import SavePoemButton from "./SavePoemButton";
import ToolbarDiv from "./ToolbarDiv";
import { ISelectablePoem } from "../types";

interface IProps {
  handleClear: () => void;
  getNewPoem: () => void;
  toggleSelectBy: () => void;
  toggleRandomLetters: () => void;
  selectablePoem: ISelectablePoem;
}

const WriterToolbar = ({
  handleClear,
  getNewPoem,
  toggleSelectBy,
  toggleRandomLetters,
  selectablePoem,
  ...props
}: IProps) => {
  // const newPoem = {
  //   ...(id ? {} : {}),
  //   passage: passage,
  //   wordLetters: wordLetters,
  // };
  console.log(selectablePoem);
  return (
    <ToolbarDiv className="writer-toolbar toolbar">
      <button
        className="toolbar-tab toolbar-tab-btn"
        onClick={toggleSelectBy}
        data-ux="toggle-select-by"
      >
        {selectablePoem.isSelectingByWord
          ? "select by letter?"
          : "select by word?"}
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
        onClick={selectablePoem.isBlank ? toggleRandomLetters : handleClear}
        data-ux="get-new-passage"
      >
        {selectablePoem.isBlank ? "nudge" : "clear"}
      </button>
      <br />
      <SavePoemButton poem={selectablePoem}>
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
