import PropTypes from 'prop-types';
import React from 'react'
import { connect } from 'react-redux'
import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'
import Poem from 'src/components/poem/Poem'

import './_closeUpPoemView.scss'

class CloseUpPoemView extends React.Component {
  componentWillMount() {
    const { handleFetchPoem, updateCurrentPoemViewed, match, poem } = this.props
    updateCurrentPoemViewed(match.params.id)
    if (!poem && match.params) {
      handleFetchPoem(match.params.id)
    }
  }
  render() {
    const { poem, currentUserId } = this.props
    return (
      <div className="close-up-poem-view">
        {poem ? (
          <Poem poem={poem} isCurrentUser={poem.authorId === currentUserId} />
        ) : (
          'loading'
        )}
      </div>
    )
  }
}

CloseUpPoemView.propTypes = {
  match: PropTypes.object,
  poem: PropTypes.object,
  handleFetchPoem: PropTypes.func,
  updateCurrentPoemViewed: PropTypes.func,
  currentUserId: PropTypes.number,
}

const mapDispatchToProps = {
  handleFetchPoem: poemDuck.handleFetchPoem,
  updateCurrentPoemViewed: poemDuck.updateCurrentPoemViewed,
}

function mapStateToProps(state) {
  const currentPoemId = poemDuck.getCurrentPoem(state)
  return {
    poem: poemDuck.getPoemById(state, { poemId: currentPoemId }),
    currentUserId: userDuck.getCurrentUserId(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseUpPoemView)
