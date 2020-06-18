import * as React from "react";
import { BodyDiv } from "src/components/poem/PoemDiv";

interface ITextChunk {
  isSelected: boolean;
  text: string;
}

const TextSpan = ({ isSelected, text }: ITextChunk) => (
  <span className={isSelected ? "is-selected" : "not-selected"}>
    <span className="text">{text}</span>
  </span>
);

const PoemBody = ({ textChunks }: { textChunks: ITextChunk[] }) => (
  <BodyDiv className="poem-text">
    {textChunks &&
      textChunks.map((textSpan, i) => <TextSpan key={i} {...textSpan} />)}
  </BodyDiv>
);

export default PoemBody;
