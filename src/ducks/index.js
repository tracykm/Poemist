const passage = require('./passage.js');
const login = require('./login.js');
const currentUser = require('./currentUser.js');
const poems = require('./poems.js');

const { combineReducers } = require('redux');

module.exports = combineReducers({
  passage,
  login,
  currentUser,
  poems,
});
