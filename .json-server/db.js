const poems = require('./poems.js')
const users = require('./users.js')
const books = require('./books.js')

module.exports = () => ({
  users,
  poems,
  books,
})
