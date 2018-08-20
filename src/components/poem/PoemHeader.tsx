import * as React from "react";
import DeleteEditLinks from "src/components/universal/DeleteEditLinks";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderDiv = styled.div`
  height: 1em;
  text-align: right;
  position: relative;
  z-index: 20;

  .delete-edit-links {
    position: absolute;
  }
`;

const PoemHeader = ({
  authorId,
  poemId,
}: {
  authorId: string;
  poemId: string;
}) => (
  <HeaderDiv>
    <DeleteEditLinks {...{ authorId, poemId }} />
    {poemId && (
      <Link to={`/poem/${poemId}`} data-cy="view-close-up-poem">
        view
      </Link>
    )}
  </HeaderDiv>
);

export default PoemHeader;
