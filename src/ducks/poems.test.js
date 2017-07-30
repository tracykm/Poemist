// import { from } from 'seamless-immutable'
import { scope } from 'src/ducks/testSetup'
import _ from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './index'
import {
  handleDeletePoem,
  handleFetchPoem,
  handleFetchIndexPoems,
  updateCurrentPoemViewed,
  getCurrentPoem,
  handleCreatePoem,
  getPoemById,
  getLoadedIndexPoems,
  handleFetchUserPoems,
  getPoemsByUser,
} from './poems'
import mockPoems from '.json-server/poems.js'

describe('poems duck', () => {
  let store
  beforeEach(() => {
    store = createStore(
      reducer,
      compose(
        applyMiddleware(thunkMiddleware),
      ),
    )
  })

  test('updateCurrentPoemViewed()', () => {
    expect(getCurrentPoem(store.getState())).toEqual(undefined)
    store.dispatch(updateCurrentPoemViewed(1))
    expect(getCurrentPoem(store.getState())).toEqual(1)
  })

  test('handleCreatePoem()', () => {
    expect.assertions(3)
    const mockPoem = mockPoems[0]
    scope
      .filteringRequestBody(/.*/, '*')
      .post('/poems/', '*')
      .reply(200, mockPoem)

    const notYetCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
    expect(notYetCreatedPoem).toEqual(undefined)

    return store.dispatch(handleCreatePoem(mockPoem)).then(() => {
      const foundPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
      const { colorRange, authorId } = foundPoem
      expect(colorRange).toEqual(mockPoem.color_range)
      expect(authorId).toEqual(mockPoem.author_id)
    })
  })

  test('handleFetchPoem()', () => {
    expect.assertions(3)
    const mockPoem = mockPoems[1]
    scope
      .get(`/poems/${mockPoem.id}`)
      .reply(200, mockPoem)

    const notYetCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
    expect(notYetCreatedPoem).toEqual(undefined)

    return store.dispatch(handleFetchPoem(mockPoem.id)).then(() => {
      const foundPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
      const { colorRange, authorId } = foundPoem
      expect(colorRange).toEqual(mockPoem.color_range)
      expect(authorId).toEqual(mockPoem.author_id)
    })
  })

  test('handleDeletePoem()', () => {
    expect.assertions(2)
    const mockPoem = mockPoems[0]
    scope
      .get(`/poems/${mockPoem.id}`)
      .reply(200, mockPoem)

    scope
      .filteringRequestBody(/.*/, '*')
      .delete('/poems/1', '*')
      .reply(200, mockPoem)

    return store.dispatch(handleFetchPoem(mockPoem.id)).then(() => {
      const tempCreatedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
      expect(tempCreatedPoem).not.toEqual(undefined)

      return store.dispatch(handleDeletePoem(mockPoem.id)).then(() => {
        const deletedPoem = getPoemById(store.getState(), { poemId: mockPoem.id })
        expect(deletedPoem).toEqual(undefined)
      })
    })
  })

  test('handleFetchIndexPoems()', () => {
    expect.assertions(2)
    scope
      .get('/poems')
      .query({ _page: 1 })
      .reply(200, mockPoems)

    const poemIndexCountBefore = _.keys(getLoadedIndexPoems(store.getState())).length
    expect(poemIndexCountBefore).not.toEqual(mockPoems.length)

    return store.dispatch(handleFetchIndexPoems(1)).then(() => {
      const poemIndexCount = _.keys(getLoadedIndexPoems(store.getState())).length

      expect(poemIndexCount).toEqual(mockPoems.length)
    })
  })

  test('handleFetchUserPoems()', () => {
    expect.assertions(2)

    const userId = 1
    const correctLength = _.size(_.filter(mockPoems, poem => poem.author_id === userId))

    scope
      .get('/poems')
      .query({ _page: 1, author_id: userId })
      .reply(200, mockPoems)

    const poemIndexCountBefore = _.size(getPoemsByUser(store.getState(), { userId }))
    expect(poemIndexCountBefore).not.toEqual(correctLength)

    return store.dispatch(handleFetchUserPoems({ userId, page: 1 })).then(() => {
      const poemIndexCount = _.size(getPoemsByUser(store.getState(), { userId }))

      expect(poemIndexCount).toEqual(correctLength)
    })
  })

  // test('getPoemAndMakeSelectable()', () => {
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
  //   return store.dispatch(getPoemAndMakeSelectable(mockPoem.id)).then(() => {
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
