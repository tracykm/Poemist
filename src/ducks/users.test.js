// import { from } from 'seamless-immutable'
// import _ from 'lodash'
import 'src/spec/testSetup'
import { scope } from 'src/spec/testSetup'
import _ from 'lodash'
import { createTestStore } from 'src/store'
import { recieveData } from './shared'
import {
  handleFetchCurrentUser,
  handleFetchUser,
  getCurrentUser,
  getUser,
  getUsers,
  handleLogInUser,
  handleLogoutUser,
} from './users'
import mockUsers from '.json-server/users.js'

describe('users duck', () => {
  let store
  beforeEach(() => {
    store = createTestStore()
  })

  test('recieveData()', () => {
    expect(_.size(getUsers(store.getState()))).toEqual(0)
    store.dispatch(recieveData({ users: mockUsers }))
    expect(_.size(getUsers(store.getState()))).toEqual(mockUsers.length)
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
    const userId = 1

    scope
      .get(`/users/${userId}`)
      .reply(200, mockUsers[0])

    // starts empty
    expect(getUser(store.getState(), { userId })).toEqual(undefined)

    return store.dispatch(handleFetchUser(userId)).then(() => {
      const user = getUser(store.getState(), { userId })
      expect(user).toEqual(mockUsers[0])
    })
  })

  test('handleLogInUser() / handleLogoutUser()', () => {
    expect.assertions(3)

    const mockUserId = 1

    scope
      .filteringRequestBody(/.*/, '*')
      .post('/users/login')
      .reply(200, mockUsers[0])

    scope
      .filteringRequestBody(/.*/, '*')
      .delete('/users/logout')
      .reply(200, mockUsers[0])

    // starts empty
    expect(getCurrentUser(store.getState())).toEqual(undefined)

    return store.dispatch(handleLogInUser(mockUserId)).then(() => {
      let user = getCurrentUser(store.getState())
      expect(user).toEqual(mockUsers[0])

      return store.dispatch(handleLogoutUser()).then(() => {
        user = getCurrentUser(store.getState())
        expect(user).toEqual(undefined)
      })
    })
  })
})
