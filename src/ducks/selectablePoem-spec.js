import selectablePoem from './selectablePoem'

describe('DUCK: selectablePoem', () => {
  const initialState = {
    isSelectingByWord: true,
    passage: null,
    wordLetters: [],
  }
  it('gets initialState', () => {
    const action = {
      type: '@@INIT',
    }
    const newState = selectablePoem(undefined, action)
    expect(newState).to.eql(initialState)
  })

  // it('gets initialState', () => {
  //   const action = {
  //     type: 'PASSAGE_RECEIVED',
  //     passage: {
  //       title: 'Awesome Book',
  //       id: 1,
  //       text: 'a few words',
  //     },
  //   }
  //   const expectedState = {
  //     isSelectingByWord: true,
  //     passage: 'a few words',
  //     wordLetters: [
  //       {
  //         'a'
  //       }
  //     ],
  //   }
  //   expect(selectablePoem(initialState, action)).to.eql(expectedState)
  // })
})
