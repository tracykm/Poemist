import * as React from "react";
import { withRouter } from "react-router-dom";
import {
  FaAngleRight,
  FaAngleLeft,
  FaArrowRight,
  FaArrowLeft
} from "react-icons/fa";
import SavePoemButton from "./SavePoemButton";
import ToolbarDiv from "./ToolbarDiv";

const BACKGROUND_ID_COUNT = 20;
const COLOR_RANGE_COUNT = 36;

function keepInRange({ num, upperlimit }) {
  if (num < 0) {
    return upperlimit - 1;
  }
  if (num > upperlimit) {
    return num - upperlimit;
  }
  return num;
}

class StyleToolbar extends React.PureComponent<any, any> {
  backgroundUp() {
    const num = this.props.backgroundId + 1;
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT });
    this.props.updateStyle({ backgroundId });
  }
  backgroundDown() {
    const num = this.props.backgroundId - 1;
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT });
    this.props.updateStyle({ backgroundId });
  }
  colorUp() {
    const num = this.props.colorRange + 1;
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT });
    this.props.updateStyle({ colorRange });
  }
  colorDown() {
    const num = this.props.colorRange - 1;
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT });
    this.props.updateStyle({ colorRange });
  }
  render() {
    const { backgroundId, colorRange, match } = this.props;
    const poemId = match.params.id;
    const backUrl = `/edit/write/${poemId}`;
    return (
      <ToolbarDiv className="style-toolbar toolbar">
        <div className="toolbar-tab">
          Style
          <button
            className="toolbar-tab-btn"
            onClick={this.backgroundDown.bind(this)}
            data-ux="background-id-down"
          >
            <FaAngleLeft />
          </button>
          {backgroundId}
          <button
            className="toolbar-tab-btn"
            onClick={this.backgroundUp.bind(this)}
            data-ux="background-id-up"
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="toolbar-tab">
          Color
          <button
            className="toolbar-tab-btn"
            onClick={this.colorDown.bind(this)}
            data-ux="color-range-down"
          >
            <FaArrowLeft />
          </button>
          {colorRange}
          <button
            className="toolbar-tab-btn"
            onClick={this.colorUp.bind(this)}
            data-ux="color-range-up"
          >
            <FaArrowRight />
          </button>
        </div>

        <div
          className="toolbar-tab toolbar-tab-btn"
          onClick={() => {
            this.props.history.push(backUrl);
          }}
        >
          <FaArrowLeft /> Back
        </div>
        <br />
        <SavePoemButton
          className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
          poem={this.props.poem}
          styleView
        >
          {({ onClick }) => (
            <button
              onClick={onClick}
              className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
              data-test="saveLink"
            >
              Finish <FaArrowRight />
            </button>
          )}
        </SavePoemButton>
      </ToolbarDiv>
    );
  }
}

export default withRouter(StyleToolbar);
