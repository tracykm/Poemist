import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { history } from 'src/routes';

import reducer from './ducks'
// Build the middleware for intercepting and dispatching navigation actions
const routerMiddlewareH = routerMiddleware(history)

const crashReporter = store => next => action => {
    return next(action)
  // try {
  //   return next(action)
  // } catch (err) {
  //   console.error('Caught an exception!', err)
  //   Bugsnag.metaData = {
  //     action,
  //     state: store.getState()
  //   }
  //   Bugsnag.notifyException(err)
  //   throw err
  // }
}

export const createTestStore = (reducerSlices = reducer) => createStore(
  reducerSlices,
  compose(
    applyMiddleware(thunkMiddleware, routerMiddlewareH),
  ),
)

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware, crashReporter, routerMiddlewareH),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
)

export default store
