// ***********************************************
// This example commands.js shows you how to
// create the custom command: 'login'.
//
// The commands.js file is a great place to
// modify existing commands and create custom
// commands for use throughout your tests.
//
// You can read more about custom commands here:
// https://on.cypress.io/api/commands
// ***********************************************
//
import { runQuery } from './graphql'

Cypress.Commands.add('getCy', function(elem) {
  return cy.get(`[data-test="${elem}"]`)
})

function responseStub(result) {
  return {
    json() {
      return Promise.resolve(result)
    },
    text() {
      return Promise.resolve(JSON.stringify(result))
    },
    ok: true,
  }
}

Cypress.Commands.add('visitStubbed', (url, operations = {}) => {
  cy.visit(url, {
    onBeforeLoad: win => {
      function serverStub(_, req) {
        // parse the request
        const { operationName, query, variables } = JSON.parse(req.body)

        // return the stub if it was provided
        const resultStub = operations[operationName]
        if (resultStub) {
          return Promise.resolve(responseStub(resultStub))
        }
        // else {
        //   return {}
        // }

        // If you want, fallback to default mock data if stub for operation is not specified (optional)
        return runQuery(query, variables).then(responseStub)
      }

      cy
        // stub `fetch`
        .stub(win, 'fetch')

        // your graphql endpoint
        // .withArgs('/graphql')

        // call our stub
        .callsFake(serverStub)
    },
  })
})
