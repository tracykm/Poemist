import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.$ = {ajax: ()=>{}}
window.$ = {ajax: ()=>{}}

global.navigator = {
  userAgent: 'node.js',
};
