import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from 'src/components/App';
import IndexView from 'src/containers/IndexView';
import CloseUpPoemView from 'src/containers/CloseUpPoemView';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IndexView} />
      <Route path="/about" component={About} />
      <Route path="/poem/:id" component={CloseUpPoemView} />
    </Route>
  </Router>
);

//
// <Router history={browserHistory}>
//   <Route path="/" component={App}>
//     <Route path="about" component={About}/>
//     <Route path="users" component={Users}>
//       <Route path="/user/:userId" component={User}/>
//     </Route>
//     <Route path="*" component={NoMatch}/>
//   </Route>
// </Router>
