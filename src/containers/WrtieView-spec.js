import 'src/spec/setupDom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { from } from 'seamless-immutable'

import formatLetters from 'src/utils/formatLetters.js'
import WriteView from './WriteView'

describe('<WriteView />', () => {
  const mockStore = configureStore([thunk])

  it('words make it down', () => {
    const store = mockStore({
      current: from({ userId: 1 }),
      selectablePoem: from({
        isSelectingByWord: true,
        passage: 'la',
        bookId: 4,
        wordLetters: formatLetters(from({ passage: 'a few words' })),
      }),
    })

    const writeView = mount(
      <WriteView store={store} params={{}} />,
    )

    expect(writeView.find('Word')).to.have.length(3)
  })
})
