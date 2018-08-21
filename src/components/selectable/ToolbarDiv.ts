import styled from "styled-components";
import { sizes } from "src/components/universal/_variables";

const ToolbarDiv = styled.div`
  position: fixed;
  right: 0;
  width: 200px;
  text-align: right;
  .toolbar {
    text-align: left;
    position: fixed;
    margin-left: ${sizes.poemWidth * 2}px;
    margin-top: ${sizes.spaceBase * 3}px;
    width: 160px;
    font-size: ${sizes.fontSizeLg}px;
  }

  .toolbar-tab {
    font-size: ${sizes.fontSizeBase}px;
    background: #333;
    color: white;
    padding: 1rem;
    margin: ${sizes.spaceSm}px 0;
    display: inline-block;
    text-align: left;

    &-lg {
      font-size: ${sizes.fontSizeLg}px;
    }

    button {
      background: black;
      color: white;
      border: none;
    }
  }
  button[disabled] {
    background: #aaa;
  }
`;

export default ToolbarDiv;
