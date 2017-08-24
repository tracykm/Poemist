// import poems from '../fixtures/poems'
// import users from '../fixtures/users'
// import books from '../fixtures/books'
//
// const lastIdx = 6
//
// describe('Home page', () => {
//   beforeEach(() => {
//     cy.server()
//     cy.route('api/users/current', users[0])
//       .route('api/poems?_page=*', [])
//   })
//
//   it('login', () => {
//     const mockUsername = 'sageApple'
//     const mockPassword = 'password123'
//
//     cy.route('api/users/current', {})
//       .visit('/about')
//       .route('POST', 'api/users/login', users[0]).as('login')
//
//       .get('[data-test="loginLink"]').click()
//       .get('[data-test="usernameInput"]').type(mockUsername)
//       .get('[data-test="passwordInput"]').type(mockPassword)
//       .get('[data-test="submit"]').click()
//
//       .wait('@login').then((xhr) => {
//         expect(xhr.requestBody.user).to.have.property('username', mockUsername)
//         expect(xhr.requestBody.user).to.have.property('password', mockPassword)
//       })
//       .get('li').contains(users[0].username)
//   })
//
//   it.only('has poem in order', () => {
//     cy.fixture('poems.js').as('p')
//     debugger
//     cy
//       .route('api/poems?_page=2', poems.slice(0, 3)).as('poems1')
//       .route('api/poems?_page=1', poems.slice(3, lastIdx))
//       .visit('/')
//
//       .wait('@poems1')
//       .get('.poem').last().should('has.attr', 'data-test', 'poem1')
//       .get('[data-test="poem1"]').contains(poems[0].textChunks[0].text)
//       .screenshot()
//   })
//
//   it('create', () => {
//     cy
//       .route('api/books/new', books[0]).as('newBook').visit('/')
//       .get('[href="/new/write"]').click()
//
//       .wait('@newBook')
//       .get('.word').first().click()
//       .screenshot()
//
//       .get('[data-test="styleLink"]').click()
//       .get('.is-selected') // selected made it to style
//
//       .route('POST', 'api/poems', poems[0]).as('poemPost')
//       .get('[data-test="saveLink"]').click()
//
//       .wait('@poemPost').then((xhr) => {
//         expect(xhr.requestBody.poem).to.have.property('title', books[0].title)
//         const chunk1 = xhr.requestBody.poem.textChunks[0]
//         expect(chunk1).to.have.property('isSelected', true)
//       })
//   })
// })
