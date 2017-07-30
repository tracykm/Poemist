// import { from } from 'seamless-immutable'
// import _ from 'lodash'
// import { scope } from 'src/ducks/testSetup'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './index'
import {
  toggleShowLogin,
  showSignUp,
  showLogin,
  getShowLogin,
  getIsSignUpSelected,
  getLoginMessage,
} from './login'

describe('login duck', () => {
  let store
  beforeEach(() => {
    store = createStore(
      reducer,
      compose(
        applyMiddleware(thunkMiddleware),
      ),
    )
  })

  test('toggleShowLogin()', () => {
    expect(getShowLogin(store.getState())).toEqual(false)

    store.dispatch(toggleShowLogin())
    expect(getShowLogin(store.getState())).toEqual(true)

    store.dispatch(toggleShowLogin())
    expect(getShowLogin(store.getState())).toEqual(false)
  })

  test('showSignUp()', () => {
    store.dispatch(showSignUp())
    expect(getIsSignUpSelected(store.getState())).toEqual(true)
  })

  test('showLogin()', () => {
    store.dispatch(showLogin())
    expect(getIsSignUpSelected(store.getState())).toEqual(false)
  })

  test('showLogin() with errors', () => {
    const mockError = 'Please sign in to like a poem.'
    store.dispatch(showLogin(mockError))
    expect(getLoginMessage(store.getState())).toEqual(mockError)
  })
})
