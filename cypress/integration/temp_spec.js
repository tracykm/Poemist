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
    cy.getCy('poem').should('have.length.above', 1)
    cy.wait(300)
    cy
      .getCy('view-close-up-poem')
      .first()
      .click()
    // cy.get('[href="/poem/106"]').click()
    cy
      .getCy('usernameLink')
      .first()
      .invoke('width')
      .should('be.greaterThan', 0)
    cy
      .getCy('usernameLink')
      .first()
      .invoke('width')
      .should('be.greaterThan', 0)
    cy
      .getCy('usernameLink')
      .first()
      .invoke('width')
      .should('be.greaterThan', 0)
    cy.wait(300)
    cy
      .getCy('usernameLink')
      .first()
      .click()
  })
})
