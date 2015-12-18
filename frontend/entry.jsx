var React = require('react');
var ReactDOM = require('react-dom');
var IndexRoute = require('react-router').IndexRoute;

var Router = require('react-router').Router;
var Route = require('react-router').Route;

var App = require('./components/app.jsx');
var CreateView = require('./components/create/createView.jsx');
var NewPoem = require('./components/create/new.jsx');
var EditPoem = require('./components/create/edit.jsx');
var WriterToolbar = require('./components/create/writerToolbar');
var StyleToolbar = require('./components/create/styleToolbar');
var IndexView = require('./components/indexView');
var CurrentUserProfile = require('./components/currentUserProfile');
var OtherUserProfile = require('./components/otherUserProfile');

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexView}/>
    <Route path="/new" component={NewPoem}>
      <Route path="create" component={CreateView}>
        <IndexRoute component={WriterToolbar}/>
        <Route path="/new/stylize" component={StyleToolbar} />
      </Route>
    </Route>
    <Route path="/edit/:poemId" component={EditPoem}>
      <Route path="create" component={CreateView}>
        <IndexRoute component={WriterToolbar}/>
        <Route path="stylize" component={StyleToolbar} />
      </Route>
    </Route>
    <Route path="/profile" component={CurrentUserProfile} />
    <Route path="/user/:user_id" component={OtherUserProfile} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('content')
  );
});
