import * as React from "react";
import Word, { IHandleClickLetter } from "./Word";
import styled from "styled-components";
import PoemDiv, { BodyDiv } from "src/components/poem/PoemDiv";
import { IWordLetter } from "../types";

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
  handleClickLetter,
}: {
  wordLetters: IWordLetter[][];
  isSelectingByWord: boolean;
  handleClickLetter: IHandleClickLetter;
}) => (
  <PoemDiv className="poem close-up">
    <SelectablePoemDiv>
      <BodyDiv className="poem-body">
        <div className="background-img" />
        <div
          className={
            isSelectingByWord ? "selecting-by-word" : "selecting-by-letter"
          }
        >
          {wordLetters.map((word, i) => (
            <Word
              word={word}
              key={i}
              wordIdx={i}
              handleClickLetter={handleClickLetter}
            />
          ))}
        </div>
      </BodyDiv>
    </SelectablePoemDiv>
  </PoemDiv>
);

export default SelectablePoemRender;
