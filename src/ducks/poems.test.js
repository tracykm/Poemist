// import { from } from 'seamless-immutable'
global.TEST_ENV = true

import { keys } from 'lodash'
import nock from 'nock'
import request from 'src/ducks/superagent'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './index'
import {
  _deletePoem,
  _getPoem,
  _getPoemAndMakeSelectable,
  _getIndexPoems,
  _currentPoemViewed, getCurrentPoem, _getNewPassage, getSelectablePoem, _createPoem, getPoemById,
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
      // thees attributes make it into store
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

    const notYetCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
    expect(notYetCreatedPoem).toEqual(undefined)

    return store.dispatch(_createPoem(mockPoem)).then(() => {
      const foundPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
      const { colorRange, authorId } = foundPoem
      expect(colorRange).toEqual(mockPoem.color_range)
      expect(authorId).toEqual(mockPoem.author_id)
    })
  })

  test('_deletePoem()', () => {
    expect.assertions(2)
    const mockPoem = mockPoems[0]
    scope
      .filteringRequestBody(/.*/, '*')
      .delete('/poems/1', '*')
      .reply(200, mockPoem)

    const notYetCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
    expect(notYetCreatedPoem).not.toEqual(undefined)

    return store.dispatch(_deletePoem(mockPoem.id)).then(() => {
      const foundPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
      expect(foundPoem).toEqual(undefined)
    })
  })

  test('_getPoem()', () => {
    expect.assertions(3)
    const mockPoem = mockPoems[1]
    scope
      .get('/poems/2')
      .reply(200, mockPoem)

    const notYetCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
    expect(notYetCreatedPoem).toEqual(undefined)

    return store.dispatch(_getPoem(mockPoem.id)).then(() => {
      const foundPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
      const { colorRange, authorId } = foundPoem
      expect(colorRange).toEqual(mockPoem.color_range)
      expect(authorId).toEqual(mockPoem.author_id)
    })
  })

  test('_getIndexPoems()', () => {
    expect.assertions(2)
    scope
      .get('/poems')
      .query({ _page: 1 })
      .reply(200, mockPoems)

    const poemIndexCountBefore = keys(store.getState().poems).length
    expect(poemIndexCountBefore).not.toEqual(mockPoems.length)

    return store.dispatch(_getIndexPoems(1)).then(() => {
      const poemIndexCount = keys(store.getState().poems).length
      expect(poemIndexCount).toEqual(mockPoems.length)
    })
  })

  // test('_getPoemAndMakeSelectable()', () => {
  //   expect.assertions(3)
  //   const mockPoem = mockPoems[0]
  //   scope
  //     .get('/poems/1')
  //     .reply(200, mockPoem)
  //
  //   const notYetCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
  //   expect(notYetCreatedPoem).toEqual(undefined)
  //
  //   console.log(getSelectablePoem(store.getState()).title);
  //   return store.dispatch(_getPoemAndMakeSelectable(mockPoem.id)).then(() => {
  //     //
  //     const foundPoem = getSelectablePoem(store.getState())
  //     console.log(getSelectablePoem(store.getState()).title);
  //     // const { title, bookId, wordLetters } = foundPoem
  //     // expect(title).toEqual(mockPoem.book_title)
  //     // expect(bookId).toEqual(mockPoem.book_id)
  //     // expect(wordLetters.length > 0).toEqual(true)
  //   })
  // })
})
