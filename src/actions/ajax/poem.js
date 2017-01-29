import { decamelizeKeys } from 'humps';

const baseUrl = `${window.location.protocol}//${window.location.host}`;
const $ = window.$;

function recievePassage(dispatch, book) {
  dispatch({
    type: 'PASSAGE_RECEIVED',
    passage: book,
  });
}

function recievePoem(dispatch, poem) {
  dispatch({
    type: 'POEM_RECEIVED',
    poem,
  });
}

function recievePoems(dispatch, poems) {
  dispatch({
    type: 'POEMS_RECEIVED',
    poems,
  });
}

function likeToggled(dispatch, book) {
  dispatch({
    type: 'LIKE_TOGGLED',
    like: book,
  });
}

module.exports = {
  getNewPassage: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/books/new`,
        success: recievePassage.bind(null, dispatch),
      });
    }
  ),
  createPoem: poem => (
    (dispatch) => {
      const formatedPoem = decamelizeKeys(poem);
      $.ajax({
        url: `${baseUrl}/api/poems/`,
        method: 'POST',
        data: { poem: formatedPoem },
        success: recievePoem.bind(null, dispatch),
      });
    }
  ),
  getPoem: id => (
    (dispatch) => {
      console.log('get poem');
      $.ajax({
        url: `${baseUrl}/api/poems/${id}`,
        success: recievePoem.bind(null, dispatch),
      });
    }
  ),
  getIndexPoems: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/poems/`,
        success: recievePoems.bind(null, dispatch),
      });
    }
  ),
  toggleLike: like => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/api/likes`,
        method: 'POST',
        data: { like },
        success: likeToggled.bind(null, dispatch),
      });
    }
  ),
};
