import 'src/spec/setupDom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { from } from 'seamless-immutable'
import WriterToolbar from './WriterToolbar'

describe('<WriterToolbar />', () => {
  const toggleSelectBy = sinon.spy()
  const getNewPassage = sinon.spy()
  const actions = {
    toggleSelectBy,
    getNewPassage,
  }

  const mockStore = configureStore([thunk])
  const store = mockStore({
    current: from({ userId: 1 }),
    selectablePoem: {
      isSelectingByWord: true,
    },
  })

  const writeToolbar = shallow(
    <WriterToolbar
      store={store}
      params={{}}
      {...actions}
    />,
  )

  it('calls toggle-select-by', () => {
    const toggle = writeToolbar.find('[data-ux="toggle-select-by"]')
    toggle.simulate('click')
    expect(toggleSelectBy.calledOnce).to.equal(true)
  })

  it('calls get-new-passage', () => {
    const toggle = writeToolbar.find('[data-ux="get-new-passage"]')
    toggle.simulate('click')
    expect(getNewPassage.calledOnce).to.equal(true)
  })
})
