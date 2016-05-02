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
// Usage:
function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var content = document.getElementById('content');
  if(content){
    ReactDOM.render(
      <Router>{routes}</Router>,
      document.getElementById('content')
    );

    $(window).load(function() {
      $("#pleaseWait").addClass("fadeOut");
      // preload([
      //     "../app/assets/images/paper-rect-contrast.jpg"
      // ]);
      setTimeout(function(){
        $("#pleaseWait").addClass("hidden");
        $("main").removeClass("pre-loading");

        var top = $(".selected").position().top
        var pageTop = document.querySelector('.poemText').offsetTop;
        $(".selected").each(function(i, elem){
          var top = elem.offsetTop + pageTop;
          var left = elem.offsetLeft + elem.offsetWidth / 2
          console.log(top);
          d3.select(".sinlgePoem svg").append("circle").attr("cx", left).attr("cy", top).attr("r", 5).style("fill", "purple");
          d3.select(".sinlgePoem svg")
            .append("polygon")
            .attr("points", starPoints(0, 0))
            .attr("transform", "translate("+left+","+ top+")")
            .style("fill", "red");
          // debugger
        })
        console.log(top);
        // debugger
      },300);
    });
    }
});


function starPoints(x, y){
  var baseShape = [ [20, 0], [25, 20], [40, 20], [30, 30], [35, 45], [20, 35], [5, 45], [10, 30], [0, 20], [15, 20] ]
  var str = ""
  var newBase = []
  baseShape.forEach(function(point, i){
    var pointX = point[0] + x
    var pointY = point[1] + y
    newBase.push([pointX, pointY])
    str += pointX + " " + pointY
    if(i !== baseShape.length-1){
      str += ", "
    }
  })
  // str fornmat "50 160, 55 180, 70 180, 60 190, 65 205, 50 195, 35 205, 40 190, 30 180, 45 180"
  return str
}
