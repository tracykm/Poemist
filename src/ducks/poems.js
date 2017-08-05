import { from } from 'seamless-immutable'
import { createSelector } from 'reselect'
import _ from 'lodash'
import request, { baseUrl } from 'src/utils/superagent'
import { RECIEVE_DATA, nestByKey } from './shared'

const POEMS_RECEIVED = 'POEMS_RECEIVED'
const POEM_RECEIVED = 'POEM_RECEIVED'
const ALL_POEMS_LOADED = 'ALL_POEMS_LOADED'
const ALL_USERS_POEMS_LOADED = 'ALL_USERS_POEMS_LOADED'
const ALL_LIKED_POEMS_LOADED = 'ALL_LIKED_POEMS_LOADED'
const POEM_DELETED = 'POEM_DELETED'
const INDEX_POEMS_RECEIVED = 'INDEX_POEMS_RECEIVED'


/* ----------- ACTIONS ----------- */
const recievePoem = poem => ({
  type: POEM_RECEIVED,
  payload: poem,
})

function recievePoems({ userId, likerId, poems }) {
  if (_.keys(poems).length > 0) {
    return {
      type: POEMS_RECEIVED,
      payload: poems, // acccidently unnests
    }
  } else {
    let args = { type: ALL_POEMS_LOADED }
    if (userId) {
      args = {
        type: ALL_USERS_POEMS_LOADED,
        payload: userId,
      }
    } else if (likerId) {
      args = {
        type: ALL_LIKED_POEMS_LOADED,
        payload: likerId,
      }
    }
    return args
  }
}

function likeToggled(book) {
  return {
    type: 'LIKE_TOGGLED',
    payload: book,
  }
}

export const handleCreatePoem = poem => (
  dispatch => (
    request
      .post(`${baseUrl}/poems/`)
      .send({ poem })
      .setCsrfToken()
      .then(res => (
        dispatch(recievePoem(res.body))
      ))
  )
)

export const handleUpdatePoem = poem => (
  (dispatch) => {
    request
      .put(`${baseUrl}/poems/${poem.id}`)
      .send({ poem })
      .setCsrfToken()
      .then(res => (
        dispatch(recievePoem(res.body))
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
        dispatch({ type: POEM_DELETED, payload: poemId })
      ))
  )
)

export const handleFetchPoem = id => (
  dispatch => (
    request
      .get(`${baseUrl}/poems/${id}`)
      .setCsrfToken()
      .then(res => (
        dispatch(recievePoem(res.body))
      ))
  )
)

export const handleFetchIndexPoems = page => (
  dispatch => (
    request
      .get(`${baseUrl}/poems`)
      .query({ _page: page })
      .setCsrfToken()
      .then((res) => {
        const poems = nestByKey(res.body)
        dispatch(recievePoems({ poems }))
        dispatch({
          type: INDEX_POEMS_RECEIVED,
          payload: _.keys(poems),
        })
      })
  )
)

export const handleFetchUserPoems = ({ userId, page }) => (
  dispatch => (
    request
      .get(`${baseUrl}/poems`)
      .query({ _page: page, author_id: userId })
      .setCsrfToken()
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
        dispatch(likeToggled(res.body))
      ))
  }
)

export const updateCurrentPoemViewed = poemId => ({
  type: 'CURRENT_POEM_VIEWED',
  poemId,
})

/* ----------- SELECTORS ----------- */
export const getPoems = state => state.poems.entries
export const getCurrentPoem = state => state.current.poemId
export const getSelectablePoem = state => state.selectablePoem
export const getIndexPoemList = state => state.poems.indexPoems

export const getPoemById = createSelector(
  getPoems,
  (s, arg) => arg,
  (poems, { poemId }) => poems[poemId],
)

export const getLoadedIndexPoems = createSelector(
  getPoems,
  getIndexPoemList,
  (poems, indexPoemList) => _.filter(
    poems,
    (poem, id) => _.includes(indexPoemList, id),
  ),
)

export const getPoemsByUser = createSelector(
  getPoems,
  (s, arg) => arg,
  (poems, { userId }) => _.filter(
    poems,
    poem => poem.authorId === userId,
  ),
)

/* ----------- REDUCER ----------- */
const initialState = {
  indexPoems: [],
  entries: {},
  npPoem: {},
}

export default (state = from(initialState), { type, payload }) => {
  switch (type) {
    case RECIEVE_DATA: {
      return state.update('entries', entries => entries.merge(nestByKey(payload.poems)))
    }
    case POEMS_RECEIVED: {
      return state.update('entries', entries => entries.merge(nestByKey(payload)))
    }
    case POEM_RECEIVED: {
      return state.setIn(['entries', payload.id], payload)
    }
    case INDEX_POEMS_RECEIVED: {
      return state.update('indexPoems', indexPoems => indexPoems.concat(payload))
    }
    case POEM_DELETED: {
      return state.update('entries', entries => entries.without(payload))
    }
    default:
      return state
  }
}
