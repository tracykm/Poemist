import styled from "styled-components";
import { sizes } from "src/components/universal/_variables";

const PoemDiv = styled.div`
  width: ${sizes.poemWidth}px;
  padding: ${sizes.spaceBase}px;
  margin: ${sizes.spaceBase}px;
  display: inline-block;
  vertical-align: text-top;
  text-align: center;
  position: relative; /* for absolute overflow styles */
  overflow: hidden;

  .is-selected {
    position: relative; /* for zindex */
    background: yellow;
  }
  .not-selected {
    color: rgba(0, 0, 0, 0.2);
  }

  /* @include mobile {
    width: 100%;
  } */
`;

export default PoemDiv;
