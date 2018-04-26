import graphql from '../fixtures/graphql'
import resolveRequest from '../fixtures/server'

describe('Home page', () => {
  // it('using regular stubbing', () => {
  //   cy.server()
  //   cy.route('POST', '**', graphql)
  //   cy.visit('http://localhost:8888/', {
  //     onBeforeLoad: win => {
  //       win.fetch = undefined
  //     },
  //   })
  // })

  it('', () => {
    cy.visitStubbed('http://localhost:8888/')
    // debugger
  })
})
