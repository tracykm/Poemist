// import { from } from 'seamless-immutable'
import { scope } from 'src/ducks/testSetup'
// import _ from 'lodash'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './index'
import {
  handleFetchNewPassage,
  // getPoemAndMakeSelectable,
  // toggleSelectedLetters,
  getSelectablePoem,
} from './selectablePoem'
import mockBooks from '.json-server/books.js'
// import mockPoems from '.json-server/poems.js'


describe('selectablePoems duck', () => {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunkMiddleware),
    ),
  )

  test('handleFetchNewPassage()', () => {
    expect.assertions(4)

    const mockPassage = mockBooks[0]
    scope
      .get('/books/new')
      .reply(200, mockPassage)

    // starts empty
    expect(getSelectablePoem(store.getState()).passage).toEqual(null)

    return store.dispatch(handleFetchNewPassage()).then(() => {
      // thees attributes make it into store
      const { passage, title, bookId } = getSelectablePoem(store.getState())
      expect(passage).toEqual(mockPassage.text)
      expect(title).toEqual(mockPassage.title)
      expect(bookId).toEqual(mockPassage.id)
    })
  })

  // test('getPoemAndMakeSelectable()', () => {
  //   expect.assertions(3)
  //   const mockPoem = mockPoems[0]
  //   scope
  //     .get('/selectablePoems/1')
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
