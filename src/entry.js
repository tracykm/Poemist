import $ from 'jQuery';
import React from 'react';
import ReactDOM from 'react-dom';

const Hello = React.createClass({
 render: function() {
   return (
     <div>
         Hello, {this.props.name}!
     </div>
   );
 },
});


ReactDOM.render(
  <Hello name="Worlds" />,
  document.getElementById('react'),
);


window.$ = $;
console.log('lala');

var root = 'https://jsonplaceholder.typicode.com';

$.ajax({
  url: root + '/posts/1',
  method: 'GET'
}).then(function(data) {
  console.log(data);
});
//
// $.ajax({
//   url: 'http://nambynonsense.herokuapp.com/api/poems/624',
//   method: 'GET'
//   }).then(function(data) {
//     console.log(data);
// });
