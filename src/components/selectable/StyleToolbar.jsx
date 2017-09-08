import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'
import * as selectablePoemDuck from 'src/ducks/selectablePoem'
import { showSignUp } from 'src/ducks/login.js'

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
  handleSave() {
    const { currentUserId, showSignUp, clearPoem } = this.props
    if (currentUserId) {
      this.savePoem().then(() => {
        this.props.history.push('/')
      })
      clearPoem()
    } else {
      showSignUp('You need a username to save a poem.')
    }
  }
  savePoem() {
    const { createPoem, updatePoem, poem, match } = this.props
    const poemId = match.params.id
    if (poemId) {
      return updatePoem({ ...poem, id: poemId })
    } else {
      return createPoem(poem)
    }
  }
  render() {
    const { backgroundId, colorRange, match } = this.props
    const poemId = match.params.id
    const backUrl = poemId ? `create/edit/write/${poemId}` : 'create/new/write'
    return (
      <div className="style-toolbar toolbar">
        <div className="toolbar-tab">
          Style
          <button className="toolbar-tab-btn" onClick={this.backgroundDown.bind(this)} data-ux="background-id-down">
            <i className="icon-angle-left" />
          </button>
          {backgroundId}
          <button className="toolbar-tab-btn" onClick={this.backgroundUp.bind(this)} data-ux="background-id-up">
            <i className="icon-angle-right" />
          </button>
        </div>

        <div className="toolbar-tab">
          Color
          <button className="toolbar-tab-btn" onClick={this.colorDown.bind(this)} data-ux="color-range-down">
            <i className="icon-angle-left" />
          </button>
          {colorRange}
          <button className="toolbar-tab-btn" onClick={this.colorUp.bind(this)} data-ux="color-range-up">
            <i className="icon-angle-right" />
          </button>
        </div>

        <Link
          className="toolbar-tab toolbar-tab-btn"
          to={backUrl}
        >
          <i className="icon-arrow-left" /> Back
        </Link>
        <button
          onClick={this.handleSave.bind(this)}
          className="toolbar-tab toolbar-tab-lg toolbar-tab-btn"
          data-test="saveLink"
        >
          Finish <i className="icon-arrow-right" />
        </button>
      </div>
    )
  }
}

StyleToolbar.propTypes = {
  updateStyle: React.PropTypes.func.isRequired,
  showSignUp: React.PropTypes.func.isRequired,
  createPoem: React.PropTypes.func.isRequired,
  clearPoem: React.PropTypes.func.isRequired,
  updatePoem: React.PropTypes.func.isRequired,
  backgroundId: React.PropTypes.number.isRequired,
  colorRange: React.PropTypes.number.isRequired,
  currentUserId: React.PropTypes.number.isRequired,
  history: React.PropTypes.object,
  poem: React.PropTypes.object,
  match: React.PropTypes.object,
}

const mapDispatchToProps = {
  makePoemUnselectable: selectablePoemDuck.makePoemUnselectable,
  updateStyle: selectablePoemDuck.updateStyle,
  clearPoem: selectablePoemDuck.clearPoem,
  updateColor: poemDuck.updateColor,
  createPoem: poemDuck.handleCreatePoem,
  updatePoem: poemDuck.handleUpdatePoem,
  showSignUp,
}

function mapStateToProps(state) {
  return {
    selectablePoem: selectablePoemDuck.getSelectablePoem(state), // TODO: make bool
    poem: selectablePoemDuck.getSelectablePoem(state),
    currentUserId: userDuck.getCurrentUserId(state),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StyleToolbar))
