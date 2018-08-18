import * as React from "react";
import { BodyDiv } from "src/components/poem/PoemDiv";

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
