import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'src/store';
import Routes from 'src/routes';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('react'),
);

// Bugsnag.beforeNotify = function(payload, metaData) {
//   // debugger
// };
