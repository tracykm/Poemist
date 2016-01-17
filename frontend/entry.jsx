var React = require('react');
var ReactDOM = require('react-dom');
var IndexRoute = require('react-router').IndexRoute;

var Router = require('react-router').Router;
var Route = require('react-router').Route;

var App = require('./components/app.jsx');
var EditProfile = require('./components/editProfile.jsx');
var CreateView = require('./components/create/createView.jsx');
var NewPoem = require('./components/create/new.jsx');
var EditPoem = require('./components/create/edit.jsx');
var WriterToolbar = require('./components/create/writerToolbar');
var StyleToolbar = require('./components/create/styleToolbar');
var IndexView = require('./components/indexViews/homeView.jsx');
var CurrentUserProfile = require('./components/indexViews/currentUserProfile');
var OtherUserProfile = require('./components/indexViews/otherUserProfile');
var OtherUserLikes = require('./components/indexViews/otherUserLikes');
var CurrentUserLikes = require('./components/indexViews/currentUserLikes');
var SinglePoemView = require('./components/singlePoem/poemShowView.jsx');
var About = require('./components/about.jsx');

var PoemStore = require('./stores/poemStore');
window.PoemStore = PoemStore;

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexView}/>
    <Route path="about" component={About}/>
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
    <Route path="/profile" component={CurrentUserProfile}/>
    <Route path="profile/edit" component={EditProfile}></Route>
    <Route path="/mylikes" component={CurrentUserLikes} />
    <Route path="/user/:user_id/likes" component={OtherUserLikes} />
    <Route path="/user/:user_id" component={OtherUserProfile}>
    </Route>
    <Route path="/poem/:poem_id" component={SinglePoemView} />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var content = document.getElementById('content');
  if(content){
    ReactDOM.render(
      <Router>{routes}</Router>,
      document.getElementById('content')
    );
    }
});
