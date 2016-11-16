module.exports = {
  getNewPassage: function() {
    return dispatch => {
      setTimeout(() => {
        // Yay! Can invoke sync or async actions with `dispatch`
        dispatch({
          type: "PASSAGE_LOADING"
        });
    }, 1000);
    };
  },
  receiveNewPassage: function() {
    return ({
      type: "PASSAGE_RECEIVED"
    });
  }
}