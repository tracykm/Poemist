import React from 'react'
import Poem from 'src/components/poem/Poem'
import { Query, graphql } from 'react-apollo'
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
      author {
        id
        username
      }
      createdAt
      updatedAt
    }
    current {
      id
    }
    networkStatus @client {
      isConnected
    }
  }
`

const UPDATE_NETWORK_STATUS = gql`
  mutation updateNetworkStatus($isConnected: Boolean) {
    updateNetworkStatus(isConnected: $isConnected) @client
  }
`

const TestApolloLinkState = ({ updateNetworkStatus }) => {
  return (
    <button onClick={() => updateNetworkStatus({ isConnected: false })}>
      toggle network
    </button>
  )
}
const WrappedComponent = graphql(UPDATE_NETWORK_STATUS, {
  props: ({ mutate }) => ({
    updateNetworkStatus: isConnected => mutate({ variables: { isConnected } }),
  }),
})(TestApolloLinkState)

const PoemWData = ({ id }) => (
  <Query query={GET_SINGLE_POEM} variables={{ id: Number(id) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      console.log('networkStatus', data.networkStatus.isConnected)

      return (
        <div>
          <WrappedComponent />
          <Poem
            poem={data.poem}
            isCurrentUser={
              data.current && data.current.id === data.poem.autherId
            }
          />
        </div>
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
