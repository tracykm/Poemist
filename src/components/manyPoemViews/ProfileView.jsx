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

class ProfileView extends React.Component {
  render() {
    const userId = Number(this.props.match.params.id)
    return (
      <div className="index-view">
        <ProfileHeaderWData id={userId} />
        <IndexView userId={userId} />
      </div>
    )
  }
}

export default ProfileView
