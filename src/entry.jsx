import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'src/store'
import Routes from 'src/routes'
import { ApolloProvider } from 'react-apollo'
import client from 'src/apollo'

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
