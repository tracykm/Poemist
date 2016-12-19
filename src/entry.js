import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './ducks';
// import OnePoemView from './containers/OnePoemView.jsx';
import IndexView from './containers/IndexView.jsx';
import './entry.scss';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <IndexView id={5} />
  </Provider>,
  document.getElementById('react'),
);
