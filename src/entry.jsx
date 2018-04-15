import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'src/store'
import Routes from 'src/routes'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`
});

import gql from "graphql-tag";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Routes />
    </Provider>
  </ApolloProvider>
  ,
  document.getElementById('react'),
)

// Bugsnag.beforeNotify = function(payload, metaData) {
//   // debugger
// }
