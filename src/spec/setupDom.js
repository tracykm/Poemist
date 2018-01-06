import jsdom from 'jsdom'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import React from 'react'

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.mount = mount
global.shallow = shallow
global.expect = expect
global.sinon = sinon
global.React = React

global.window = document.defaultView
global.$ = { ajax: () => {} }
window.$ = { ajax: () => {} }

global.navigator = {
  userAgent: 'node.js',
}
