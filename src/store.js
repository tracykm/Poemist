import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './ducks';

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Bugsnag.metaData = {
      action,
      state: store.getState()
    }
    Bugsnag.notifyException(err);
    throw err
  }
};

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware, crashReporter),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

export default store;
