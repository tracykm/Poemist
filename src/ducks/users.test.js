// import { from } from 'seamless-immutable'
// import _ from 'lodash'
import { scope } from 'src/ducks/testSetup'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './index'
import {
  handleFetchCurrentUser,
  handleFetchUser,
  getCurrentUser,
  getUser,
  handleLogInUser,
} from './users'
import mockUsers from '.json-server/users.js'

describe('users duck', () => {
  let store
  beforeEach(() => {
    store = createStore(
      reducer,
      compose(
        applyMiddleware(thunkMiddleware),
      ),
    )
  })

  test('handleFetchCurrentUser()', () => {
    expect.assertions(2)

    scope
      .get('/users/current')
      .reply(200, mockUsers[0])

    // starts empty
    expect(getCurrentUser(store.getState())).toEqual(undefined)

    return store.dispatch(handleFetchCurrentUser()).then(() => {
      const user = getCurrentUser(store.getState())
      expect(user).toEqual(mockUsers[0])
    })
  })

  test('handleFetchUser()', () => {
    expect.assertions(2)

    const mockUserId = 1

    scope
      .get(`/users/${mockUserId}`)
      .reply(200, mockUsers[0])

    // starts empty
    expect(getUser(store.getState(), mockUserId)).toEqual(undefined)

    return store.dispatch(handleFetchUser(mockUserId)).then(() => {
      const user = getUser(store.getState(), mockUserId)
      expect(user).toEqual(mockUsers[0])
    })
  })

  test('handleLogInUser()', () => {
    expect.assertions(2)

    const mockUserId = 1

    scope
      .filteringRequestBody(/.*/, '*')
      .post('/users/login')
      .reply(200, mockUsers[0])

    // starts empty
    expect(getCurrentUser(store.getState())).toEqual(undefined)

    return store.dispatch(handleLogInUser(mockUserId)).then(() => {
      const user = getCurrentUser(store.getState(), mockUserId)
      expect(user).toEqual(mockUsers[0])
    })
  })
})
