// import $ from 'jQuery';
import { decamelizeKeys } from 'humps';
import { formatPoem, formatPoems } from 'src/utils/formatPoem.js';

// const baseUrl = window.location.protocol + '//' + window.location.host + '/api';
const baseUrl = 'http://localhost:3000/api';

function recievePassage(dispatch, book) {
  dispatch({
    type: 'PASSAGE_RECEIVED',
    passage: book,
  });
}

function recievePoem(dispatch, poem) {
  dispatch({
    type: 'POEM_RECEIVED',
    poem: formatPoem(poem),
  });
}

function recievePoemMakeSelectable(dispatch, poem) {
  dispatch({
    type: 'MAKE_POEM_SELECTABLE',
    poem: formatPoem(poem),
  });
}

function recievePoems(dispatch, poems) {
  // debugger
  dispatch({
    type: 'POEMS_RECEIVED',
    poems: formatPoems(poems),
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
        url: `${baseUrl}/books/new`,
        success: recievePassage.bind(null, dispatch),
      });
    }
  ),
  createPoem: poem => (
    (dispatch) => {
      const formatedPoem = decamelizeKeys(poem);
      $.ajax({
        url: `${baseUrl}/poems/`,
        method: 'POST',
        data: { poem: formatedPoem },
        success: recievePoems.bind(null, dispatch),
      });
    }
  ),
  updatePoem: poem => (
    (dispatch) => {
      const formatedPoem = decamelizeKeys(poem);
      $.ajax({
        url: `${baseUrl}/poems/${poem.id}`,
        method: 'PUT',
        data: { poem: formatedPoem },
        success: recievePoem.bind(null, dispatch),
      });
    }
  ),
  deletePoem: poemId => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/poems/${poemId}`,
        method: 'DELETE',
        success: dispatch.bind(null, { type: 'POEM_DELETED', poemId }),
      });
    }
  ),
  getPoem: id => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/poems/${id}`,
        success: recievePoem.bind(null, dispatch),
      });
    }
  ),
  getPoemAndMakeSelectable: id => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/poems/${id}`,
        success: recievePoemMakeSelectable.bind(null, dispatch),
      });
    }
  ),
  getIndexPoems: () => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/poems/`,
        success: recievePoems.bind(null, dispatch),
      });
    }
  ),
  getUserPoems: ({ userId, page }) => (
    (dispatch) => {
      $.ajax({
        data: { page_num: page },
        url: `${baseUrl}/poems/by_author/${userId}`,
        success: recievePoems.bind(null, dispatch),
      });
    }
  ),
  toggleLike: like => (
    (dispatch) => {
      $.ajax({
        url: `${baseUrl}/likes`,
        method: 'POST',
        data: { like },
        success: likeToggled.bind(null, dispatch),
      });
    }
  ),
};
