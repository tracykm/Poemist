// const { decamelizeKeys } = require('humps');

module.exports = (state = { text: null, title: null, id: null }, action) => {
  switch (action.type) {
    case 'PASSAGE_RECEIVED':
      return action.passage;
    default:
      return state;
  }
};
