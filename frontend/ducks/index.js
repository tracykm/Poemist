const passage = require('./passage.js');
const loginMessages = require('./loginErrors.js');

const { combineReducers } = require('redux');

module.exports = combineReducers({
    passage,
    loginMessages,
});
