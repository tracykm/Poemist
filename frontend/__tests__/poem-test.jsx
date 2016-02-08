var React = require('react/addons'),
    Header = require('../components/header.jsx'),
    TestUtils = React.addons.TestUtils,
    expect = require('expect');


it("renders an h1", function () {
    var component = TestUtils.renderIntoDocument(
        <Header />
    );

    var h1 = TestUtils.findRenderedDOMComponentWithTag(
       component, 'h1'
    );

    expect(h1.getDOMNode().textContent)
        .toEqual("Poemsit");
});
