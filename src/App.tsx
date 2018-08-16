import * as React from "react";
import styled from "styled-components";
import { sizes } from "src/components/universal/_variables";
import Navbar from "src/components/fullApp/Navbar";
import ModalContainer from "src/components/login/ModalContainer";
// import { withRouter } from "react-router-dom";
// import 'reset-css/reset.css'

const AppDiv = styled.div`
  .app {
    font-size: ${sizes.fontSizeBase};
    font-family: "Avenir Next", sans-serif;
  }

  .page-body {
    padding: ${sizes.spaceBase};
    margin-top: ${sizes.headerHeight};
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
`;

class App extends React.Component {
  render() {
    return (
      <AppDiv>
        <Navbar />
        <div className="page-body">{this.props.children}</div>

        <div
          className="modal fade"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New message
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="col-form-label">Recipient:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Message:</label>
                    <textarea className="form-control" id="message-text" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>

        <ModalContainer />
      </AppDiv>
    );
  }
}

export default App;
