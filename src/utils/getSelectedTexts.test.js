import { from } from 'seamless-immutable'
import getSelectedTexts from './getSelectedTexts.js'
import formatLetters from './formatLetters.js'

describe('#getSelectedTexts', () => {
  test('empty', () => {
    const wordLetters = from([])

    const selectedTexts = from([])
    expect(getSelectedTexts(wordLetters)).toEqual(selectedTexts)
    expect(formatLetters(selectedTexts)).toEqual(wordLetters)
  })

  test('first letter seleted', () => {
    const wordLetters = from([
      [
        { ch: '0', isSelected: true }, // 0
      ],
    ])

    const selectedTexts = from([
      { text: '0', isSelected: true },
    ])
    expect(getSelectedTexts(wordLetters)).toEqual(selectedTexts)
    // expect(formatLetters(selectedTexts)).toEqual(wordLetters)
  })

  test('last letter seleted', () => {
    const wordLetters = from([
      [
        { ch: '0', isSelected: false }, // 0
        { ch: '1', isSelected: true }, // 1
      ],
    ])

    const selectedTexts = from([
      { text: '0', isSelected: false },
      { text: '1', isSelected: true },
    ])
    expect(getSelectedTexts(wordLetters)).toEqual(selectedTexts)
    // expect(formatLetters(selectedTexts)).toEqual(wordLetters)
  })

  test('middle letter selected', () => {
    const wordLetters = from([
      [
        { ch: '0', isSelected: false }, // 0
        { ch: '1', isSelected: false }, // 1
        { ch: '2', isSelected: true }, // 2
      ],
    ])

    const selectedTexts = from([
      { text: '01', isSelected: false },
      { text: '2', isSelected: true },
    ])
    expect(getSelectedTexts(wordLetters)).toEqual(selectedTexts)
    // expect(formatLetters(selectedTexts)).toEqual(wordLetters)
  })

  test('multiple words', () => {
    const wordLetters = from([
      [
        { ch: '0', isSelected: true }, // 0
        { ch: '1', isSelected: true }, // 1
        { ch: '2', isSelected: true }, // 2
        { ch: ' ', isSelected: true }, // 2
      ],
      [
        { ch: '4', isSelected: true }, // 3
        { ch: '5', isSelected: false }, // 4
      ],
    ])

    const selectedTexts = from([
      { text: '012 4', isSelected: true },
      { text: '5', isSelected: false },
    ])
    expect(getSelectedTexts(wordLetters)).toEqual(selectedTexts)
    // expect(formatLetters(selectedTexts)).toEqual(wordLetters)
  })
})
