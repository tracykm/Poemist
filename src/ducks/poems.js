import { from } from 'seamless-immutable'
import { decamelizeKeys } from 'humps'
import { formatPoem, formatPoems } from 'src/utils/formatPoem.js'
import request from 'src/ducks/superagent'

const baseUrl = 'http://localhost:3000/api'

export default (state = from({}), action) => {
  switch (action.type) {
    case 'POEMS_RECEIVED': {
      const newPoems = {}
      action.poems.forEach((poem) => {
        newPoems[poem.id] = poem
      })
      return state.merge(newPoems)
    }
    case 'POEM_RECEIVED': {
      const { poem } = action
      return state.set(poem.id, poem)
    }
    case 'POEM_DELETED': {
      return state.without(action.poemId)
    }
    default:
      return state
  }
}

function recievePassage(dispatch, book) {
  dispatch({
    type: 'PASSAGE_RECEIVED',
    passage: book,
  })
}

function recievePoem(dispatch, poem) {
  dispatch({
    type: 'POEM_RECEIVED',
    poem: formatPoem(poem),
  })
}

function recievePoemMakeSelectable(dispatch, poem) {
  dispatch({
    type: 'MAKE_POEM_SELECTABLE',
    poem: formatPoem(poem),
  })
}

function recievePoems({ dispatch, userId, likerId }, poems) {
  if (poems.length > 0) {
    dispatch({
      type: 'POEMS_RECEIVED',
      poems: formatPoems(poems),
    })
  } else {
    let args = { type: 'ALL_POEMS_LOADED' }
    if (userId) {
      args = {
        type: 'ALL_USERS_POEMS_LOADED',
        userId,
      }
    } else if (likerId) {
      args = {
        type: 'ALL_LIKED_POEMS_LOADED',
        likerId,
      }
    }
    dispatch(args)
  }
}

function likeToggled(dispatch, book) {
  dispatch({
    type: 'LIKE_TOGGLED',
    like: book,
  })
}

export const _getNewPassage = () => (
  (dispatch) => {
    request
      .get(`${baseUrl}/books/new`)
      .end((err, res) => {
        if (err) { return }
        recievePassage(dispatch, res.body)
      })
  }
)

export const _createPoem = poem => (
  (dispatch) => {
    const formatedPoem = decamelizeKeys(poem)
    request
      .post(`${baseUrl}/poems/`)
      .send({ poem: formatedPoem })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        recievePoem(dispatch, res.body)
      })
  }
)
export const _updatePoem = poem => (
  (dispatch) => {
    const formatedPoem = decamelizeKeys(poem)
    request
      .put(`${baseUrl}/poems/${poem.id}`)
      .send({ poem: formatedPoem })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        recievePoem(dispatch, res.body)
      })
  }
)
export const _deletePoem = poemId => (
  (dispatch) => {
    request
      .delete(`${baseUrl}/poems/${poemId}`)
      .send({ poemId })
      .setCsrfToken()
      .end((err) => {
        if (err) { return }
        dispatch({ type: 'POEM_DELETED', poemId })
      })
  }
)
export const _getPoem = id => (
  (dispatch) => {
    request
      .get(`${baseUrl}/poems/${id}`)
      .end((err, res) => {
        if (err) { return }
        recievePoem(dispatch, res.body)
      })
  }
)

export const _getPoemAndMakeSelectable = id => (
  (dispatch) => {
    request
      .get(`${baseUrl}/poems/${id}`)
      .end((err, res) => {
        if (err) { return }
        recievePoemMakeSelectable(dispatch, res.body)
      })
  }
)

export const _getIndexPoems = page => (
  (dispatch) => {
    request
      .get(`${baseUrl}/poems`)
      .query({ _page: page })
      .end((err, res) => {
        if (err) { return }
        recievePoems({ dispatch }, res.body)
      })
  }
)

export const _getUserPoems = ({ userId, page }) => (
  (dispatch) => {
    request
      .get(`${baseUrl}/poems`)
      .query({ _page: page, author_id: userId })
      .end((err, res) => {
        if (err) { return }
        recievePoems({ dispatch, userId }, res.body)
      })
  }
)

export const _toggleLike = like => (
  (dispatch) => {
    request
      .post(`${baseUrl}/likes`)
      .query({ like })
      .setCsrfToken()
      .end((err, res) => {
        if (err) { return }
        likeToggled(dispatch, res.body)
      })
  }
)

export const _currentPoemViewed = poemId => (
  {
    type: 'CURRENT_POEM_VIEWED',
    poemId,
  }
)
