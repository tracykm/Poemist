import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from 'src/store'
import Routes from 'src/routes'
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: `${process.env.API_URL}/graphql`
});

import gql from "graphql-tag";

client
  .query({
    query: gql`
      {
        user(id: 6) {
          id
          username
          sessionToken
          poemsWrittenCount
        }
      }
    `
  })
  .then(result => console.log(result)).catch(e => console.log(e));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('react'),
)

// Bugsnag.beforeNotify = function(payload, metaData) {
//   // debugger
// }
