import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from 'src/components/App';
import About from 'src/components/About';
import HomeView from 'src/containers/HomeView';
import ProfileView from 'src/containers/ProfileView';
import CloseUpPoemView from 'src/containers/CloseUpPoemView';
import WriteView from 'src/containers/WriteView.jsx';
import StyleView from 'src/containers/StyleView.jsx';
import store from 'src/store';

const history = syncHistoryWithStore(browserHistory, store);

export default () => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomeView} />
      <Route path="/about" component={About} />
      <Route path="/new/write" component={WriteView} />
      <Route path="/new/stylize" component={StyleView} />
      <Route path="/edit/stylize/:id" component={StyleView} />
      <Route path="/edit/write/:id" component={WriteView} />
      <Route path="/poem/:id" component={CloseUpPoemView} />
      <Route path="/user/:id" component={ProfileView} />
    </Route>
  </Router>
);
