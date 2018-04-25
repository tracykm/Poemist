import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  shouldBatch: true,
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
})

export default client
