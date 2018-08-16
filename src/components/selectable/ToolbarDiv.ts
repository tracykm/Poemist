import styled from "styled-components";
import { sizes } from "src/components/universal/_variables";

const ToolbarDiv = styled.div`
  .toolbar {
    text-align: left;
    position: fixed;
    margin-left: ${sizes.poemWidth * 2};
    margin-top: ${sizes.spaceBase * 3};
    width: 160px;
    font-size: ${sizes.fontSizeLg}px;
  }

  .toolbar-tab {
    font-size: ${sizes.fontSizeBase}px;
    background: #333;
    color: white;
    padding: 1rem;
    margin: ${sizes.spaceSm} 0;
    display: inline-block;
    text-align: left;

    &-lg {
      font-size: ${sizes.fontSizeLg}px;
    }
  }
`;

export default ToolbarDiv;
