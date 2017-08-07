import App from 'src/containers/App'
import About from 'src/components/About'
import HomeView from 'src/containers/HomeView'
import ProfileView from 'src/containers/ProfileView'
import CloseUpPoemView from 'src/containers/CloseUpPoemView'
import WriteView from 'src/containers/WriteView.jsx'
import StyleView from 'src/containers/StyleView.jsx'

import React from 'react'

import createHistory from 'history/createBrowserHistory'
import { Router, Route } from 'react-router-dom'

export const history = createHistory();
// Create a history of your choosing (we're using a browser history in this case)

export default () => (
  <Router history={history}>
    <App>
      <Route path="/" exact component={HomeView} />
      <Route path="/about" component={About} />
      <Route path="/new/write" component={WriteView} />
      <Route path="/new/stylize" component={StyleView} />
      <Route path="/edit/stylize/:id" component={StyleView} />
      <Route path="/edit/write/:id" component={WriteView} />
      <Route path="/poem/:id" component={CloseUpPoemView} />
      <Route path="/user/:id" component={ProfileView} />
    </App>
  </Router>
)
