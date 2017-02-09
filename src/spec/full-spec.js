import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import 'src/spec/setupDom';
import App from 'src/components/App.jsx';
import sinon from 'sinon';
import jQuery from 'jQuery';
import { expect } from 'chai';

import store from 'src/store';

describe('Full project', () => {
  let server;

  beforeEach(() => {
    server = sinon.fakeServer.create();
    server.respondWith('GET',
      '/api/users/current',
      [200,
        { 'Content-Type': 'application/json' },
        '{"id": 1,"username": "tracy"}',
      ],
    );
  });

  afterEach(() => {
    server.restore();
  });

  it('connects', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    console.log(wrapper.debug());
  })
});




describe("SinonFakeServer", function() {
  var server;

  beforeEach(function() {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it("should fake a jQuery ajax request", function () {
    server.respondWith("GET", "/something",
                       [200, { "Content-Type": "application/json" },
                        '{ "stuff": "is", "awesome": "in here" }']);

    var callbacks = [sinon.spy(), sinon.spy()];

    jQuery.ajax({
      url: "/something",
      success: (data) => {
        debugger
        console.log('sucess!!!!!!', data);
      },
      error: (err) => {
        console.log('bad', err);
      }
    });

    jQuery.ajax({
      url: "/other",
      success: callbacks[1]
    });

    console.log(server.requests); // Logs all requests so far
    server.respond(); // Process all requests so far

    expect(callbacks[0].calledOnce).to.be.true;
    expect(callbacks[0].calledWith({
      stuff: "is",
      awesome: "in here"
    })).to.be.true;

    expect(callbacks[1].calledOnce).to.be.false; // Unknown URL /other received 404
  });
});
