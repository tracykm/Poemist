import React from 'react'
import Poem from 'src/components/poem/Poem'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import './_closeUpPoemView.scss'

const GET_SINGLE_POEM = gql`
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
    current {
      id
    }
  }
`

const PoemWData = ({ id }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>

      return (
        <Poem
          poem={data.poem}
          isCurrentUser={data.current && data.current.id === data.poem.autherId}
        />
      )
    }}
  </Query>
)

const CloseUpPoemView = ({ match: { params } }) => (
  <div className="close-up-poem-view">
    <PoemWData id={params.id} />
  </div>
)

export default CloseUpPoemView
