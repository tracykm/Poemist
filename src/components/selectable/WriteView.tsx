import * as React from "react";
import WriterToolbar from "src/components/selectable/WriterToolbar";
import PoemState from "src/components/selectable/PoemState";
import SelectablePoem from "src/components/selectable/SelectablePoem";

class HelpSection extends React.Component {
  state = {
    showHelp: !localStorage.getItem("returningUser"),
  };
  componentWillMount() {
    localStorage.setItem("returningUser", "true");
  }
  render() {
    return (
      <div className="visible-lg-block">
        <div
          onClick={() => this.setState({ showHelp: !this.state.showHelp })}
          style={{
            background: "#ddd",
            padding: "10px",
            position: "absolute",
            cursor: "pointer",
          }}
        >
          help
        </div>
        {this.state.showHelp && (
          <div style={{ float: "left", marginTop: "80px" }}>
            <h3 style={{ display: "inline" }}>Example</h3>
            <span
              onClick={() => this.setState({ showHelp: false })}
              style={{
                padding: "10px",
                display: "inline-block",
                cursor: "pointer",
                color: "#bbb",
              }}
            >
              x hide
            </span>
            <div>
              <img src="https://media.giphy.com/media/l4pT4LDniFo4OwSVW/giphy.gif" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const WriteView = ({ match }) => {
  const poemId = match.params.id;
  return (
    <PoemState poemId={poemId}>
      {props => {
        return (
          <div>
            <HelpSection />
            <div className="close-up-poem-view text-center">
              <h1>{poemId ? "Edit" : "Write"}</h1>
              <h5>Make your own poem by clicking on words!</h5>
              <WriterToolbar {...props} poemId={poemId} />
              <SelectablePoem {...props} />
            </div>
          </div>
        );
      }}
    </PoemState>
  );
};

export default WriteView;
