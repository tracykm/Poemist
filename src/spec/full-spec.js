import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import 'src/spec/setupDom';

import store from 'src/store';
import Routes from 'src/routes';

describe('<WriteView />', () => {

  it('connects', () => {
    const App = mount(
      <Provider store={store}>
        <Routes />
      </Provider>
    );
    console.log(App.debug());
  })
});
