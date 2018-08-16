import * as React from "react";
import styled from "styled-components";

const BodyDiv = styled.div`
  line-height: 1em;
  height: 25em; /* 25 lines */
  overflow: hidden;
  font-family: "Garamond", serif;
  padding-bottom: 0.3em;
`;

interface ITextChunk {
  isSelected: boolean;
  text: string;
}

const TextSpan = ({ isSelected, text }: ITextChunk) => (
  <span className={isSelected ? "is-selected" : "not-selected"}>{text}</span>
);

const PoemBody = ({ textChunks }: { textChunks: ITextChunk[] }) => (
  <BodyDiv>
    {textChunks &&
      textChunks.map((textSpan, i) => <TextSpan key={i} {...textSpan} />)}
  </BodyDiv>
);

export default PoemBody;
