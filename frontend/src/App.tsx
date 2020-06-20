import * as React from "react"
import styled from "styled-components"
import { sizes } from "src/components/universal/_variables"
import Navbar from "src/components/fullApp/Navbar"
import ModalContainer from "src/components/login/ModalContainer"
// import { withRouter } from "react-router-dom";
// import 'reset-css/reset.css'

const AppDiv = styled.div`
  @media (max-width: 550px) {
    min-width: 550px;
    .poem {
      margin: 0.2em;
    }
    /* .close-up-poem-view {
      min-width: 550px;
    } */
  }
  .app {
    font-size: ${sizes.fontSizeBase};
    font-family: "Avenir Next", sans-serif;
  }

  .page-body {
    padding: ${sizes.spaceBase}px;
    margin-top: ${sizes.headerHeight}px;
    text-align: center;
  }

  .index-view {
    text-align: left;
  }

  .error {
    color: red;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
  }

  a:hover {
    cursor: pointer;
  }
`

class App extends React.Component {
  render() {
    return (
      <AppDiv>
        <Navbar />
        <div className="page-body">{this.props.children}</div>

        <ModalContainer />
      </AppDiv>
    )
  }
}

export default App
