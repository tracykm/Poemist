import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as selectablePoemDuck from 'src/ducks/selectablePoem'
import StyleToolbar from 'src/components/selectable/StyleToolbar'
import Poem from 'src/components/poem/Poem.jsx'

class StyleView extends React.Component {
  componentWillMount() {
    const { makePoemUnselectable, poem } = this.props
    if (poem.passage) {
      makePoemUnselectable(poem)
    } else {
      this.props.history.push('/new/write')
    }
  }

  render() {
    const { poem } = this.props
    const backgroundId = poem ? poem.backgroundId : null
    const colorRange = poem ? poem.colorRange : null
    return (
      <div className="close-up-poem-view">
        <h1>Stylize</h1>
        <StyleToolbar {...{ backgroundId, colorRange }} />
        <Poem poem={poem} />
      </div>
    )
  }
}

const mapDispatchToProps = {
  makePoemUnselectable: selectablePoemDuck.makePoemUnselectable,
}

StyleView.propTypes = {
  poem: React.PropTypes.object,
  makePoemUnselectable: React.PropTypes.func,
}

function mapStateToProps(state) {
  return {
    poem: selectablePoemDuck.getSelectablePoem(state),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StyleView),
)
