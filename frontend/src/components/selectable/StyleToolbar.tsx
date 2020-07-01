import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import {
  FaAngleRight,
  FaAngleLeft,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa"
import SavePoemButton from "./SavePoemButton"
import ToolbarDiv from "./ToolbarDiv"
import { IPoem } from "../types"

const BACKGROUND_ID_COUNT = 20
const COLOR_RANGE_COUNT = 36

function keepInRange({ num, upperlimit }: { num: number; upperlimit: number }) {
  if (num < 0) {
    return upperlimit - 1
  }
  if (num > upperlimit) {
    return num - upperlimit
  }
  return num
}

interface IProps {
  poem: IPoem
  updateStyle: (arg: { backgroundId?: number; colorRange?: number }) => void
}

class StyleToolbar extends React.PureComponent<
  IProps & RouteComponentProps<{ id: string }>
> {
  backgroundUp = () => {
    const num = this.props.poem.backgroundId + 1
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT })
    this.props.updateStyle({ backgroundId })
  }
  backgroundDown = () => {
    const num = this.props.poem.backgroundId - 1
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT })
    this.props.updateStyle({ backgroundId })
  }
  colorUp = () => {
    const num = this.props.poem.colorRange + 1
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT })
    this.props.updateStyle({ colorRange })
  }
  colorDown = () => {
    const num = this.props.poem.colorRange - 1
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT })
    this.props.updateStyle({ colorRange })
  }
  render() {
    const { poem } = this.props
    const backUrl = `/edit/write/${poem.id}`
    return (
      <ToolbarDiv className="style-toolbar toolbar">
        <div className="toolbar-tab">
          <button
            onClick={this.backgroundDown}
            className="arrow-btn"
            data-ux="background-id-down"
          >
            <FaAngleLeft />
          </button>
          <span className="text">Style {poem.backgroundId}</span>
          <button
            onClick={this.backgroundUp}
            className="arrow-btn"
            data-ux="background-id-up"
            style={{ float: "right" }}
          >
            <FaAngleRight />
          </button>
        </div>

        <div className="toolbar-tab">
          <button
            onClick={this.colorDown}
            className="arrow-btn"
            data-ux="color-range-down"
          >
            <FaAngleLeft />
          </button>

          <span className="text">Color {poem.colorRange}</span>

          <button
            onClick={this.colorUp}
            className="arrow-btn"
            data-ux="color-range-up"
            style={{ float: "right" }}
          >
            <FaAngleRight />
          </button>
        </div>

        <div
          className="toolbar-tab lower"
          onClick={() => {
            this.props.history.push(backUrl)
          }}
        >
          <span className="text">
            <FaArrowLeft /> Back
          </span>
        </div>
        <SavePoemButton poem={poem} styleView>
          {({ onClick }) => (
            <button
              onClick={onClick}
              className="toolbar-tab toolbar-tab-lg lower"
              data-test="saveLink"
            >
              <span className="text">
                Finish <FaArrowRight />
              </span>
            </button>
          )}
        </SavePoemButton>
      </ToolbarDiv>
    )
  }
}

export default withRouter(StyleToolbar)
