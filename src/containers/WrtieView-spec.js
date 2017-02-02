import 'src/spec/setupDom';
import React from 'react';
import { Provider } from 'react-redux';
import { expect } from 'chai';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import formatLetters from 'src/utils/formatLetters.js';
import WriteView from './WriteView';

describe('<WriteView />', () => {
  const mockStore = configureStore([thunk]);

  it('words make it down', () => {
    const store = mockStore({
      current: { userId: 1 },
      selectablePoem: {
        isSelectingByWord: true,
        passage: 'la',
        bookId: 4,
        wordLetters: formatLetters({ passage: 'a few words' }),
      },
    });

    const writeView = mount(
      <WriteView store={store} params={{}} />,
    );

    expect(writeView.find('Word')).to.have.length(3);
  });
});
