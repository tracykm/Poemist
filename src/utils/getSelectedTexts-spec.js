import 'src/spec/setupDom.js'
import { from } from 'seamless-immutable'
import getSelectedTexts from './getSelectedTexts.js'

describe('#getSelectedTexts', () => {
  it('empty', () => {
    const wordLetters = from([])

    const selectedTexts = from([])
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts)
  })

  it('first letter seleted', () => {
    const wordLetters = from([
      [
        { ch: 'c', isSelected: true }, // 0
      ],
    ])

    const selectedTexts = from([
      [0, 1],
    ])
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts)
  })

  it('last letter seleted', () => {
    const wordLetters = from([
      [
        { ch: 'c', isSelected: false }, // 0
        { ch: 'a', isSelected: true }, // 1
      ],
    ])

    const selectedTexts = from([
      [1, 2],
    ])
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts)
  })

  it('middle letter selected', () => {
    const wordLetters = from([
      [
        { ch: 'c', isSelected: false }, // 0
        { ch: 'a', isSelected: true }, // 1
        { ch: 'a', isSelected: false }, // 2
      ],
    ])

    const selectedTexts = from([
      [1, 2],
    ])
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts)
  })

  it('multiple words', () => {
    const wordLetters = from([
      [
        { ch: 'c', isSelected: true }, // 0
        { ch: 'a', isSelected: true }, // 1
        { ch: 'a', isSelected: true }, // 2
      ],
      [
        { ch: 'c', isSelected: false }, // 3
        { ch: 'a', isSelected: false }, // 4
      ],
    ])

    const selectedTexts = from([
      [0, 3],
    ])
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts)
  })
})
