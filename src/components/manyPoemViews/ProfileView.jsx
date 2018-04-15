import PropTypes from 'prop-types';
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'

import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'
import IndexView from 'src/components/manyPoemViews/IndexView'

import { Query } from "react-apollo";
import gql from "graphql-tag";

const ProfileHeaderWData = ({ id }) => (
  <Query
    query={gql`
      {
        user(id: ${id}) {
          id
          username
          sessionToken
          poemsWrittenCount
        }
        current {
          id
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <ProfileHeader {...data} />
    }}
  </Query>
);

const ProfileHeader = ({ user, current }) => {
  const isCurrentUser = current && current.id === userId
  const pronoun = isCurrentUser ? 'you' : 'they'
  const poemsWrittenCount = user && user.poemsWrittenCount
  const createdAt = user && moment(user.createdAt).fromNow()
  return (
    <div>
      <h1>{user && user.username}</h1>
      <div>
        Poems Written: <strong>{poemsWrittenCount}</strong>
      </div>
      <div>
        Signed Up: <strong>{createdAt}</strong>
      </div>
      <h5>Look at all the lovely poems {pronoun} have written!</h5>
    </div>
  )
}

// const FEED_QUERY = gql`
//   query Feed($type: FeedType!, $offset: Int, $limit: Int) {
//     currentUser {
//       login
//     }
//     feed(type: $type, offset: $offset, limit: $limit) {
//       id
//       # ...
//     }
//   }
// `;

const POEM_LIMIT = 4;

const GetUserPoems = gql`
  query GetUserPoems($offset: Int!, $authorId: Int) {
    poems(limit: ${POEM_LIMIT}, offset: $offset, authorId: $authorId) {
      id
      styleId
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author
      authorId
      createdAt
      updatedAt
    }
  }
`

class UsersPoems extends React.PureComponent {
  state = {
    allPoemsLoaded: false
  }
  getMorePoems = () => {
    this.setState({ offset: this.state.offset + 10 })
  }
  render() {
    return (
      <Query
        query={GetUserPoems}
        variables={{
          offset: 0,
          authorId: this.props.userId
        }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <IndexView
              poems={data.poems}
              allPoemsLoaded={this.state.allPoemsLoaded}
              getMorePoems={(page) => {
                const that = this
                return fetchMore({
                  variables: {
                    offset: data.poems.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (fetchMoreResult.poems.length < POEM_LIMIT) that.setState({ allPoemsLoaded: true })
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      poems: [...prev.poems, ...fetchMoreResult.poems]
                    });
                  }
                })
              }}
            />)
        }}
      </Query>)
  }
}

class ProfileView extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getMorePoems(0)
    }
  }
  getMorePoems = (page) => {
    const { userId, handleFetchUserPoems } = this.props
    if (userId) {
      handleFetchUserPoems({ userId, page })
    }
  }
  render() {
    const { poems, user, userId, currentUserId, allPoemsLoaded } = this.props
    return (
      <div className="index-view">
        <ProfileHeaderWData id={userId} />
        <UsersPoems userId={userId} />
      </div>
    )
  }
}

ProfileView.propTypes = {
  poems: PropTypes.array,
  handleFetchUserPoems: PropTypes.func,
  handleFetchUser: PropTypes.func,
  allPoemsLoaded: PropTypes.bool,
  userId: PropTypes.number,
  currentUserId: PropTypes.number,
  user: PropTypes.object,
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
