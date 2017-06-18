import React from 'react'
import { connect } from 'react-redux'
import { _getPoem } from 'src/ducks/poems'
import { _currentPoemViewed } from 'src/ducks/poems.js'
import Poem from 'src/components/poem/Poem.jsx'

import './_closeUpPoemView.scss'

class CloseUpPoemView extends React.Component {
  componentWillMount() {
    const { getPoem, currentPoemViewed, params, poem } = this.props
    currentPoemViewed(params.id)
    if (!poem && params) {
      getPoem(params.id)
    }
  }
  render() {
    const { poem, currentUserId } = this.props
    return (
      <div className="close-up-poem-view">
        {poem ? <Poem poem={poem} isCurrentUser={poem.authorId === currentUserId} /> : 'loading'}
      </div>
    )
  }
}

CloseUpPoemView.propTypes = {
  params: React.PropTypes.object,
  poem: React.PropTypes.object,
  getPoem: React.PropTypes.func,
  currentPoemViewed: React.PropTypes.func,
  currentUserId: React.PropTypes.number,
}

const mapDispatchToProps = {
  getPoem: _getPoem,
  currentPoemViewed: _currentPoemViewed,
}

function mapStateToProps(state) {
  const currentPoemId = state.current.poemId
  return {
    poem: state.poems[currentPoemId],
    currentUserId: state.current.userId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseUpPoemView)
