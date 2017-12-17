import { from } from 'seamless-immutable'
import toggleLetters from './toggleLetters'

describe('#toggleLetters', () => {
  describe('with none preselected', () => {
    const wordLetters = from([
      // formatLetters({ passage: 'two words' })
      [
        { ch: 't', isSelected: false },
        { ch: 'w', isSelected: false },
        { ch: 'o', isSelected: false },
        { ch: ' ', isSelected: false },
      ],
      [
        { ch: 'w', isSelected: false },
        { ch: 'o', isSelected: false },
        { ch: 'r', isSelected: false },
        { ch: 'd', isSelected: false },
        { ch: 's', isSelected: false },
      ],
    ])

    test('flips letter in letter mode', () => {
      const params = {
        wordIdx: 0,
        letterIdx: 0,
        wordLetters,
        isSelectingByWord: false,
      }
      const result = toggleLetters(params)
      const expectedResult = from([
        // formatLetters({ passage: 'two words' })
        [
          { ch: 't', isSelected: true },
          { ch: 'w', isSelected: false },
          { ch: 'o', isSelected: false },
          { ch: ' ', isSelected: false },
        ],
        [
          { ch: 'w', isSelected: false },
          { ch: 'o', isSelected: false },
          { ch: 'r', isSelected: false },
          { ch: 'd', isSelected: false },
          { ch: 's', isSelected: false },
        ],
      ])
      expect(result).toEqual(expectedResult)
    })

    test('flips word in word mode', () => {
      const params = {
        wordIdx: 0,
        letterIdx: 0,
        wordLetters,
        isSelectingByWord: true,
      }
      const result = toggleLetters(params)
      const expectedResult = from([
        // formatLetters({ passage: 'two words' })
        [
          { ch: 't', isSelected: true },
          { ch: 'w', isSelected: true },
          { ch: 'o', isSelected: true },
          { ch: ' ', isSelected: true },
        ],
        [
          { ch: 'w', isSelected: false },
          { ch: 'o', isSelected: false },
          { ch: 'r', isSelected: false },
          { ch: 'd', isSelected: false },
          { ch: 's', isSelected: false },
        ],
      ])
      expect(result).toEqual(expectedResult)
    })
  })
  describe('with preselected', () => {
    const wordLetters = from([
      // formatLetters({ passage: 'one' })
      [
        { ch: 'o', isSelected: false }, // 0
        { ch: 'n', isSelected: false }, // 1
        { ch: 'e', isSelected: true }, // 2
      ],
    ])

    test('flips whole word (if letter minority)', () => {
      // clicked 'E': onE => one
      const params = {
        wordIdx: 0,
        letterIdx: 2,
        wordLetters,
        isSelectingByWord: true,
      }
      const result = toggleLetters(params)
      const expectedResult = from([
        [
          { ch: 'o', isSelected: false }, // 0
          { ch: 'n', isSelected: false }, // 1
          { ch: 'e', isSelected: false }, // 2
        ],
      ])
      expect(result).toEqual(expectedResult)
    })

    test('flips whole word (if letter majority)', () => {
      // clicked 'N': onE => ONE
      const params = {
        wordIdx: 0,
        letterIdx: 1,
        wordLetters,
        isSelectingByWord: true,
      }
      const result = toggleLetters(params)
      const expectedResult = from([
        [
          { ch: 'o', isSelected: true }, // 0
          { ch: 'n', isSelected: true }, // 1
          { ch: 'e', isSelected: true }, // 2
        ],
      ])
      expect(result).toEqual(expectedResult)
    })
  })
})
