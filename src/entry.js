import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './ducks';
import Routes from './routes';
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
    <Routes />
  </Provider>,
  document.getElementById('react'),
);
