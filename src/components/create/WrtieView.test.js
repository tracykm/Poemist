import 'src/spec/setupDom'
import { createTestStore } from 'src/store'
import { scope } from 'src/spec/testSetup'
import { MemoryRouter } from 'react-router-dom'
import ConnectedWriteView from './WriteView'
import mockBooks from '../../../.json-server/books.js'

describe('<WriteView />', () => {
  scope.get('/books/new').reply(200, mockBooks[0])

  const store = createTestStore()
  const writeView = mount(
    <MemoryRouter>
      <ConnectedWriteView store={store} match={{ params: {} }} />
    </MemoryRouter>,
  )

  test.skip('words make it down', () => {
    scope.get('/books/new').reply(200, mockBooks[0])

    return writeView
      .find('WriteView')
      .prop('handleFetchNewPassage')()
      .then(() => {
        expect(writeView.find('Word')).to.have.length(3)
      })
  })

  test.skip('clicking toggles selection isSelected', () => {
    expect(
      writeView
        .find('Letter')
        .first()
        .prop('isSelected'),
    ).to.equal(false)
    writeView
      .find('Letter')
      .first()
      .simulate('click')
    expect(
      writeView
        .find('Letter')
        .first()
        .prop('isSelected'),
    ).to.equal(true)
  })
})
