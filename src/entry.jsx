import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'src/store'
import Routes from 'src/routes'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const defaultState = {
  networkStatus: { __typename: 'NetworkStatus', isConnected: true },
}

const client = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
  request: operation => {
    const token = localStorage.getItem('session')
    operation.setContext({
      headers: {
        'X-CSRF-Token': token,
      },
    })
  },
  clientState: {
    defaults: defaultState,
    resolvers: {
      Mutation: {
        updateNetworkStatus: (_, { isConnected }, { cache }) => {
          const data = {
            networkStatus: {
              __typename: 'NetworkStatus',
              isConnected,
            },
          }
          console.log('data', data)
          cache.writeData({ data })
          return null
        },
      },
    },
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ApolloProvider>,
  document.getElementById('react'),
)

// Bugsnag.beforeNotify = function(payload, metaData) {
//   // debugger
// }
