import jsdom from 'jsdom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';

global.mount = mount;
global.shallow = shallow;
global.expect = expect;
global.sinon = sinon;
global.React = React;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.$ = {ajax: ()=>{}}
window.$ = {ajax: ()=>{}}

global.navigator = {
  userAgent: 'node.js',
};
