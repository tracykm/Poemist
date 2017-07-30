import { from } from 'seamless-immutable'
import { decamelizeKeys } from 'humps'
import { formatPoem, formatPoems } from 'src/utils/formatPoem.js'
import _ from 'lodash'
import request from 'src/ducks/superagent'

const baseUrl = 'http://localhost:3000/api'

function nestByKey(poems) {
  const newPoems = {}
  poems.forEach((poem) => {
    newPoems[poem.id] = poem
  })
  return newPoems
}

export default (state = from({ entries: {}, indexPoems: [] }), action) => {
  switch (action.type) {
    case 'POEMS_RECEIVED': {
      const { poems } = action.payload
      return state.update('entries', entries => entries.merge(nestByKey(poems)))
    }
    case 'POEM_RECEIVED': {
      const { poem } = action
      return state.setIn(['entries', poem.id], poem)
    }
    case 'INDEX_POEMS_RECEIVED': {
      const { poemIds } = action
      return state.update('indexPoems', indexPoems => indexPoems.concat(poemIds))
    }
    case 'POEM_DELETED': {
      return state.update('entries', entries => entries.without(action.poemId))
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

function recievePoems({ userId, likerId, poems }) {
  if (_.keys(poems).length > 0) {
    return {
      type: 'POEMS_RECEIVED',
      payload: {
        poems: formatPoems(poems), // acccidently unnests
      },
    }
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
    return args
  }
}

function likeToggled(dispatch, book) {
  dispatch({
    type: 'LIKE_TOGGLED',
    like: book,
  })
}

export const handleFetchNewPassage = () => (
  dispatch => (
    request
      .get(`${baseUrl}/books/new`)
      .then(res => (
        recievePassage(dispatch, res.body)
      ))
  )
)

export const handleCreatePoem = poem => (
  dispatch => (
    request
      .post(`${baseUrl}/poems/`)
      .send({ poem: decamelizeKeys(poem) })
      .setCsrfToken()
      .then(res => (
        recievePoem(dispatch, res.body)
      ))
  )
)
export const handleUpdatePoem = poem => (
  (dispatch) => {
    const formatedPoem = decamelizeKeys(poem)
    request
      .put(`${baseUrl}/poems/${poem.id}`)
      .send({ poem: formatedPoem })
      .setCsrfToken()
      .then(res => (
        recievePoem(dispatch, res.body)
      ))
  }
)
export const handleDeletePoem = poemId => (
  dispatch => (
    request
      .delete(`${baseUrl}/poems/${poemId}`)
      .send({ poemId })
      .setCsrfToken()
      .then(() => (
        dispatch({ type: 'POEM_DELETED', poemId })
      ))
  )
)
export const handleFetchPoem = id => (
  dispatch => (
    request
      .get(`${baseUrl}/poems/${id}`)
      .then(res => (
        recievePoem(dispatch, res.body)
      ))
  )
)

export const getPoemAndMakeSelectable = id => (
  dispatch => (
    request
      .get(`${baseUrl}/poems/${id}`)
      .then(res => (
        recievePoemMakeSelectable(dispatch, res.body)
      ))
  )
)

export const handleFetchIndexPoems = page => (
  dispatch => (
    request
      .get(`${baseUrl}/poems`)
      .query({ _page: page })
      .then((res) => {
        const poems = nestByKey(res.body)
        dispatch(recievePoems({ poems }))
        dispatch({
          type: 'INDEX_POEMS_RECEIVED',
          poemIds: _.keys(poems),
        })
      })
  )
)

export const handleFetchUserPoems = ({ userId, page }) => (
  dispatch => (
    request
      .get(`${baseUrl}/poems`)
      .query({ _page: page, author_id: userId })
      .then(res => (
        dispatch(recievePoems({ userId, poems: res.body }))
      ))
  )
)

export const handleToggleLike = like => (
  (dispatch) => {
    request
      .post(`${baseUrl}/likes`)
      .query({ like })
      .setCsrfToken()
      .then(res => (
        likeToggled(dispatch, res.body)
      ))
  }
)

export const updateCurrentPoemViewed = poemId => (
  {
    type: 'CURRENT_POEM_VIEWED',
    poemId,
  }
)

export const getCurrentPoem = state => state.current.poemId
export const getSelectablePoem = state => state.selectablePoem
export const getPoemById = (state, { poemId }) => state.poems.entries[poemId]

export const getIndexPoemList = state => state.poems.indexPoems
export const getLoadedIndexPoems = state => (_.filter(state.poems.entries, (poem, id) => {
  return _.includes(getIndexPoemList(state), id) // cant use native includes, babel + seamless-immutable
}))

export const getPoemsByUser = (state, userId) => _.filter(state.poems.entries, (poem => poem.authorId === userId))
