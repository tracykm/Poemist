// import { from } from 'seamless-immutable'
global.TEST_ENV = true

import nock from 'nock'
import request from 'src/ducks/superagent'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './index'
import {
  _currentPoemViewed, getCurrentPoem, _getNewPassage, getSelectablePoem, _createPoem, getPoem,
} from './poems'
import mockBooks from '.json-server/books.js'
import mockPoems from '.json-server/poems.js'


const baseUrl = 'http://localhost:3000/api'

const scope = nock(baseUrl)
  .defaultReplyHeaders({
    'X-Powered-By': 'Rails',
    'Content-Type': 'application/json',
  })

describe('poems duck', () => {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunkMiddleware),
    ),
  )
  test('_currentPoemViewed()', () => {
    expect(getCurrentPoem(store.getState())).toEqual(undefined)
    store.dispatch(_currentPoemViewed(1))
    expect(getCurrentPoem(store.getState())).toEqual(1)
  })

  test('_getNewPassage()', () => {
    expect.assertions(4)

    const mockPassage = mockBooks[0]
    scope
      .get('/books/new')
      .reply(200, mockPassage)

    // starts empty
    expect(getSelectablePoem(store.getState()).passage).toEqual(null)

    return store.dispatch(_getNewPassage()).then(() => {
      // thes attributes make it into store
      const { passage, title, bookId } = getSelectablePoem(store.getState())
      expect(passage).toEqual(mockPassage.text)
      expect(title).toEqual(mockPassage.title)
      expect(bookId).toEqual(mockPassage.id)
    })
  })

  test('_createPoem()', () => {
    expect.assertions(3)
    const mockPoem = mockPoems[0]
    scope
      .filteringRequestBody(/.*/, '*')
      .post('/poems/', '*')
      .reply(200, mockPoem)

    const notYetCreatedPoem = getPoem(store.getState(), { poemId: mockPoem.id })
    expect(notYetCreatedPoem).toEqual(undefined)

    return store.dispatch(_createPoem(mockPoem)).then(() => {
      const foundPoem = getPoem(store.getState(), { poemId: mockPoem.id })
      const { colorRange, authorId } = foundPoem
      expect(colorRange).toEqual(mockPoem.color_range)
      expect(authorId).toEqual(mockPoem.author_id)
    })
  })
})
