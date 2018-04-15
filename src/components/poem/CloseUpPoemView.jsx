import PropTypes from 'prop-types';
import React from 'react'
import { connect } from 'react-redux'
import * as poemDuck from 'src/ducks/poems'
import * as userDuck from 'src/ducks/users'
import Poem from 'src/components/poem/Poem'
import { Query } from "react-apollo";
import gql from "graphql-tag";

import './_closeUpPoemView.scss'

const GetSinglePoem = gql`
  query GetSinglePoem($id: ID!) {
        poem(id: $id) {
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

const ProfileHeaderWData = ({ id }) => (
  <Query
    query={GetSinglePoem}
    variables={{ id: Number(id) }}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return <Poem poem={data.poem} isCurrentUser={false} />
    }}
  </Query>
);

const CloseUpPoemView = ({ match: { params } }) => (
  <div className="close-up-poem-view">
    <ProfileHeaderWData id={params.id} />
  </div>
)

export default CloseUpPoemView;
