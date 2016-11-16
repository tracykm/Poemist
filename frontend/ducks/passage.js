// const { decamelizeKeys } = require('humps');

module.exports = function questionnaire(state = '', action) {
    switch (action.type) {
        case 'PASSAGE_RECEIVED':
            return action.passage;
        case 'PASSAGE_LOADING':
            return "loading... .";
        default:
            return state;
    }
};

