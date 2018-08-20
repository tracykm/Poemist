import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  FaAngleRight,
  FaAngleLeft,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import SavePoemButton from "./SavePoemButton";
import ToolbarDiv from "./ToolbarDiv";
import { IPoem } from "../types";

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

interface IProps {
  poem: IPoem;
  updateStyle: (arg: { backgroundId?: number; colorRange?: number }) => void;
}

class StyleToolbar extends React.PureComponent<
  IProps & RouteComponentProps<{ id: string }>
> {
  backgroundUp = () => {
    const num = this.props.poem.backgroundId + 1;
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT });
    this.props.updateStyle({ backgroundId });
  };
  backgroundDown = () => {
    const num = this.props.poem.backgroundId - 1;
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT });
    this.props.updateStyle({ backgroundId });
  };
  colorUp = () => {
    const num = this.props.poem.colorRange + 1;
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT });
    this.props.updateStyle({ colorRange });
  };
  colorDown = () => {
    const num = this.props.poem.colorRange - 1;
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT });
    this.props.updateStyle({ colorRange });
  };
  render() {
    const { poem } = this.props;
    const backUrl = `/edit/write/${poem.id}`;
    return (
      <ToolbarDiv className="style-toolbar toolbar">
        <div className="toolbar-tab">
          Style
          <button
            className="toolbar-tab-btn"
            onClick={this.backgroundDown}
            data-ux="background-id-down"
          >
            <FaAngleLeft />
          </button>
          {poem.backgroundId}
          <button
            className="toolbar-tab-btn"
            onClick={this.backgroundUp}
            data-ux="background-id-up"
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="toolbar-tab">
          Color
          <button
            className="toolbar-tab-btn"
            onClick={this.colorDown}
            data-ux="color-range-down"
          >
            <FaArrowLeft />
          </button>
          {poem.colorRange}
          <button
            className="toolbar-tab-btn"
            onClick={this.colorUp}
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
        <SavePoemButton poem={this.props.poem} styleView>
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
