import * as React from "react";
import Word from "./Word";
import styled from "styled-components";
import PoemDiv from "src/components/poem/PoemDiv";

const SelectablePoemDiv = styled.div`
  .letter {
    cursor: pointer;
  }

  .selecting-by-word .word:hover .letter,
  .selecting-by-letter .letter:hover {
    /* background: rgba(255, 255, 0, .7); */
    color: cyan;
    &.is-selected {
      color: red;
    }
  }
`;

const SelectablePoemRender = ({
  wordLetters,
  isSelectingByWord,
  handleClick
}) => (
  <PoemDiv className="poem">
    <SelectablePoemDiv>
      <div className="poem-body">
        <div className="background-img" />
        <div
          className={
            isSelectingByWord ? "selecting-by-word" : "selecting-by-letter"
          }
        >
          {wordLetters.map((word, i) => (
            <Word word={word} key={i} wordIdx={i} handleClick={handleClick} />
          ))}
        </div>
      </div>
    </SelectablePoemDiv>
  </PoemDiv>
);

export default SelectablePoemRender;
