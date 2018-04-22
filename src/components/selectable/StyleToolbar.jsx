import React from 'react'
import { withRouter } from 'react-router-dom'
import AngleRightIcon from 'react-icons/lib/fa/angle-right'
import AngleLeftIcon from 'react-icons/lib/fa/angle-left'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-right'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'
import SavePoemButton from './SavePoemButton'

import './_toolbar.scss'

const BACKGROUND_ID_COUNT = 10
const COLOR_RANGE_COUNT = 36

function keepInRange({ num, upperlimit }) {
  if (num < 0) {
    return upperlimit - 1
  }
  if (num > upperlimit) {
    return num - upperlimit
  }
  return num
}

class StyleToolbar extends React.Component {
  backgroundUp() {
    const num = this.props.backgroundId + 1
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT })
    this.props.updateStyle({ backgroundId })
  }
  backgroundDown() {
    const num = this.props.backgroundId - 1
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT })
    this.props.updateStyle({ backgroundId })
  }
  colorUp() {
    const num = this.props.colorRange + 1
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT })
    this.props.updateStyle({ colorRange })
  }
  colorDown() {
    const num = this.props.colorRange - 1
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT })
    this.props.updateStyle({ colorRange })
  }
  render() {
    const { backgroundId, colorRange, match } = this.props
    const poemId = match.params.id
    const backUrl = `/edit/write/${poemId}`
    return (
      <div className="style-toolbar toolbar">
        <div className="toolbar-tab">
          Style
          <button
            className="toolbar-tab-btn"
            onClick={this.backgroundDown.bind(this)}
            data-ux="background-id-down"
          >
            <AngleLeftIcon />
          </button>
          {backgroundId}
          <button
            className="toolbar-tab-btn"
            onClick={this.backgroundUp.bind(this)}
            data-ux="background-id-up"
          >
            <AngleRightIcon />
          </button>
        </div>

        <div className="toolbar-tab">
          Color
          <button
            className="toolbar-tab-btn"
            onClick={this.colorDown.bind(this)}
            data-ux="color-range-down"
          >
            <AngleLeftIcon />
          </button>
          {colorRange}
          <button
            className="toolbar-tab-btn"
            onClick={this.colorUp.bind(this)}
            data-ux="color-range-up"
          >
            <AngleRightIcon />
          </button>
        </div>

        <div
          className="toolbar-tab toolbar-tab-btn"
          onClick={() => {
            this.props.history.push(backUrl)
          }}
        >
          <ArrowLeftIcon /> Back
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
              Finish <ArrowRightIcon />
            </button>
          )}
        </SavePoemButton>
      </div>
    )
  }
}

export default withRouter(StyleToolbar)
