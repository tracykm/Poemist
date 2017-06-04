import { from } from 'seamless-immutable'
import getSelectedTexts from './getSelectedTexts.js'
import makePassageChunks from './makePassageChunks'

describe('#makePassageChunks', () => {
  const passage = '0123456789'

  test('handles simple', () => {
    const selectedTexts = from([[2, 6]])
    const chunks = from([
      { text: '01', isSelected: false },
      { text: '2345', isSelected: true },
      { text: '6789', isSelected: false },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })

  test('handles first', () => {
    const selectedTexts = from([[0, 1]])
    const chunks = from([
      { text: '0', isSelected: true },
      { text: '123456789', isSelected: false },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })

  test('handles last', () => {
    const selectedTexts = from([[9, 10]])
    const chunks = from([
      { text: '012345678', isSelected: false },
      { text: '9', isSelected: true },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })

  test('handles multiple select arrays', () => {
    const selectedTexts = from([[0, 1], [9, 10]])
    const chunks = from([
      { text: '0', isSelected: true },
      { text: '12345678', isSelected: false },
      { text: '9', isSelected: true },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })

  test('handles complicated', () => {
    const selectedTexts = from([[1, 2], [4, 5], [7, 9]])
    const chunks = from([
      { text: '0', isSelected: false },
      { text: '1', isSelected: true },
      { text: '23', isSelected: false },
      { text: '4', isSelected: true },
      { text: '56', isSelected: false },
      { text: '78', isSelected: true },
      { text: '9', isSelected: false },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })

  test('handles none', () => {
    const selectedTexts = from([])
    const chunks = from([
      { text: '0123456789', isSelected: false },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })

  test('integrates wtesth #getSelectedTexts', () => {
    const wordLetters = from([
      [
        { ch: '0', isSelected: false }, // 0
        { ch: '1', isSelected: true }, // 1
      ],
    ])
    const selectedTexts = getSelectedTexts(wordLetters)
    const chunks = from([
      { text: '0', isSelected: false },
      { text: '1', isSelected: true },
      { text: '23456789', isSelected: false },
    ])
    expect(makePassageChunks({ selectedTexts, passage })).toEqual(chunks)
  })
})
