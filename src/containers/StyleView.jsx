import React from 'react'
import { connect } from 'react-redux'
import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'
import * as selectablePoemDuck from 'src/ducks/selectablePoem'
import { showSignUp } from 'src/ducks/logIn.js'
import StyleToolbar from 'src/components/selectable/StyleToolbar'
import Poem from 'src/components/poem/Poem.jsx'

class StyleView extends React.Component {
  componentWillMount() {
    const { makePoemUnselectable, selectablePoem } = this.props
    if (selectablePoem.passage) {
      makePoemUnselectable(selectablePoem)
    } else {
      this.props.router.push('/new/write')
    }
  }

  render() {
    const { poem, router, updateStyle, updateColor, currentUserId, createPoem, updatePoem, showSignUp, makePoemUnselectable, params } = this.props
    const backgroundId = poem ? poem.backgroundId : null
    const colorRange = poem ? poem.colorRange : null
    const styleProps = {
      updateStyle,
      updateColor,
      backgroundId,
      colorRange,
      params,
      router,
      currentUserId,
      showSignUp,
      makePoemUnselectable,
      createPoem,
      updatePoem,
      poem,
    }
    return (
      <div className="close-up-poem-view">
        <h1>Stylize</h1>
        <StyleToolbar {...styleProps} />
        <Poem poem={poem} />
      </div>
    )
  }
}

StyleView.propTypes = {
  currentUserId: React.PropTypes.number,
  selectablePoem: React.PropTypes.object,
  poem: React.PropTypes.object,
  router: React.PropTypes.object,
  params: React.PropTypes.object,
  makePoemUnselectable: React.PropTypes.func,
  showSignUp: React.PropTypes.func,
  updateStyle: React.PropTypes.func,
  updateColor: React.PropTypes.func,
  createPoem: React.PropTypes.func,
  updatePoem: React.PropTypes.func,
}

const mapDispatchToProps = {
  makePoemUnselectable: poemDuck.makePoemUnselectable,
  updateStyle: poemDuck.updateStyle,
  updateColor: poemDuck.updateColor,
  createPoem: poemDuck.handleCreatePoem,
  updatePoem: poemDuck.handleUpdatePoem,
  showSignUp: showSignUp,
}

function mapStateToProps(state) {
  return {
    selectablePoem: selectablePoemDuck.getSelectablePoem(state), // TODO: make bool
    poem: poemDuck.getNpPoem(state),
    currentUserId: userDuck.getCurrentUserId(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleView)
