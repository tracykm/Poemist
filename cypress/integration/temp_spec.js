import graphql from '../fixtures/graphql'

describe('Home page', () => {
  it('does', () => {
    cy.server()
    cy.route('OPTIONS', '**', { id: 1, name: 'Amanda' }).as('la')
    cy.route('POST', '**', graphql).as('getUser')
    cy.visit('http://localhost:8888/', {
      onBeforeLoad: win => {
        win.fetch = undefined
      },
    })
    cy.wait('@getUser')
  })
})
