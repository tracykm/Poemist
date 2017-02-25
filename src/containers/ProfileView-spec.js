// import 'src/spec/setupDom'
// import configureStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import { from } from 'seamless-immutable'
// import { Provider } from 'react-redux'
//
// import ProfileView from './ProfileView'
// import poem from 'src/spec/poem.json'
//
// describe('<ProfileView />', () => {
//   const mockStore = configureStore([thunk])
//
//   it('words make it down', () => {
//     debugger
//     const store = mockStore({
//       current: from({ userId: 1 }),
//       users: from({ 1: {} }),
//       poems: from({ 1: poem }),
//     })
//
//     const writeView = mount(
//       <Provider store={store}>
//         <ProfileView params={{}} />,
//       </Provider>
//     )
//
//     expect(writeView.find('.is-selected')).to.have.length(2) // poem happens to have 2 selects
//   })
// })
