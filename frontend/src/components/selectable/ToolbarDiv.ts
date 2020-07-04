import styled from "styled-components"
import { sizes, color } from "src/components/universal/_variables"

const ToolbarDiv = styled.div`
  text-align: left;
  position: fixed;
  left: calc(50vw + 250px);
  top: 18rem;
  width: 170px;
  @media (max-width: ${sizes.tablet}) {
    width: ${sizes.poemWidth * 2}px;
    left: calc(50vw - 250px);
    bottom: 0;
    top: auto;
    z-index: 10;
    .toolbar-tab {
      border: ${color.greyDarken4} solid !important;
      margin: 0 !important;
      flex-grow: 1;
    }
    .lower {
      /* font-size: ${sizes.fontSizeBase * 2}px !important; */
    }
    display: flex;
    .text {
      order: 3;
      flex-grow: 1;
      text-align: center;
    }
    .arrow-btn {
      flex-grow: 1;
    }
  }
  @media (max-width: 550px) {
    left: 0;
    width: 100%;
  }

  .toolbar {
    margin-left: ${sizes.poemWidth * 2}px;
    margin-top: ${sizes.spaceBase * 3}px;
    font-size: ${sizes.fontSizeLg}px;
  }

  .toolbar-tab {
    font-size: ${sizes.fontSizeBase}px;
    background: #333;
    color: white;
    margin: ${sizes.spaceSm}px 0;
    text-align: left;
    border: none;
    cursor: pointer;

    &-lg {
      font-size: ${sizes.fontSizeLg}px;
      white-space: nowrap;
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
  .arrow-btn {
    font-size: 2em !important;
    cursor: pointer;
  }
  .text {
    display: inline-block;
    padding: 0.5em;
  }
`

export default ToolbarDiv
