import graphql from './graphql'

function resolveRequest() {
  //   debugger
  return {
    json() {
      return Promise.resolve(graphql)
    },
    text() {
      return Promise.resolve(JSON.stringify(graphql))
    },
    ok: true,
  }
}

export default resolveRequest
