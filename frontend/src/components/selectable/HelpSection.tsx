import * as React from "react"

class HelpSection extends React.PureComponent<{}> {
  state = {
    showHelp: !localStorage.getItem("returningUser"),
  }
  componentWillMount() {
    localStorage.setItem("returningUser", "true")
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
    )
  }
}

export default HelpSection
