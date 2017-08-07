import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'

import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'
import IndexView from 'src/components/IndexView.jsx'

class ProfileView extends React.Component {
  constructor() {
    super()
    this.getMorePoems = this.getMorePoems.bind(this)
  }
  componentDidMount() {
    const { userId, handleFetchUser } = this.props
    handleFetchUser(userId)
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getMorePoems(0)
    }
  }
  getMorePoems(page) {
    const { userId, handleFetchUserPoems } = this.props
    if (userId) {
      handleFetchUserPoems({ userId, page })
    }
  }
  render() {
    const { poems, user, userId, currentUserId, allPoemsLoaded } = this.props
    const pronoun = (currentUserId === userId) ? 'you' : 'they'
    const poemCount = user && user.poemIds.length
    const createdAt = user && moment(user.createdAt).fromNow()
    return (
      <div className="index-view">
        <h1>{user && user.username}</h1>
        <div>Poems Written: <strong>{poemCount}</strong></div>
        <div>Signed Up: <strong>{createdAt}</strong></div>
        <h5>Look at all the lovely poems {pronoun} have written!</h5>
        <IndexView
          poems={poems}
          getMorePoems={this.getMorePoems}
          allPoemsLoaded={allPoemsLoaded}
        />
      </div>
    )
  }
}

ProfileView.propTypes = {
  poems: React.PropTypes.array,
  handleFetchUserPoems: React.PropTypes.func,
  handleFetchUser: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
  userId: React.PropTypes.number,
  currentUserId: React.PropTypes.number,
  user: React.PropTypes.object,
}

const mapDispatchToProps = {
  handleFetchUserPoems: poemDuck.handleFetchUserPoems,
  handleFetchUser: userDuck.handleFetchUser,
}

function mapStateToProps(state, ownProps) {
  const currentUserId = userDuck.getCurrentUserId(state)
  const userId = Number(ownProps.match.params.id)
  let allPoemsLoaded
  let user
  if (userId) {
    // ugly beacuse any could be undefined
    allPoemsLoaded = state.users[userId] && state.users[userId].allPoemsLoaded
    user = userDuck.getUser(state, { userId })
  }
  return {
    poems: _.values(poemDuck.getPoemsByUser(state, { userId })),
    userId,
    user,
    currentUserId,
    allPoemsLoaded,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
