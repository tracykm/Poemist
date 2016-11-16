module.exports = {
  getNewPassage: function() {
    return dispatch => {
      $.ajax({
        url: "api/books/new",
        success: function (book) {
          dispatch({
            type: "PASSAGE_RECEIVED",
            passage: book
          });
        }
      });
    };
  }
}