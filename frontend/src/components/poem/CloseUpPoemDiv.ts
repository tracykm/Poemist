import styled from "styled-components"
import { sizes } from "src/components/universal/_variables"
const exampleClickingImg = require("src/images/example-clicking.gif")

const CloseUpPoemDiv = styled.div`
  .close-up-poem-view {
    text-align: center;
    width: ${sizes.poemWidth * 2};
    margin: auto;
    text-align: center;
    .poem {
      margin: 0;
      width: ${sizes.poemWidth * 2};
    }
  }
  .help-image {
    background: url(${exampleClickingImg});
    width: 100px;
    height: 100px;
  }
`

export default CloseUpPoemDiv
