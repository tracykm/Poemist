import getSelectedTexts from './getSelectedTexts.js';
import { expect } from 'chai';

describe('#getSelectedTexts', () => {
  it('empty', () => {
    const wordLetters = [];

    const selectedTexts = [];
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts);
  });

  it('first letter seleted', () => {
    const wordLetters = [
      [
        { ch: 'c', isSelected: true }, // 0
      ],
    ];

    const selectedTexts = [
      [0, 1],
    ];
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts);
  });

  it('last letter seleted', () => {
    const wordLetters = [
      [
        { ch: 'c', isSelected: false }, // 0
        { ch: 'a', isSelected: true }, // 1
      ],
    ];

    const selectedTexts = [
      [1, 2],
    ];
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts);
  });

  it('middle letter selected', () => {
    const wordLetters = [
      [
        { ch: 'c', isSelected: false }, // 0
        { ch: 'a', isSelected: true }, // 1
        { ch: 'a', isSelected: false }, // 2
      ],
    ];

    const selectedTexts = [
      [1, 2],
    ];
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts);
  });

  it('multiple words', () => {
    const wordLetters = [
      [
        { ch: 'c', isSelected: true }, // 0
        { ch: 'a', isSelected: true }, // 1
        { ch: 'a', isSelected: true }, // 2
      ],
      [
        { ch: 'c', isSelected: false }, // 3
        { ch: 'a', isSelected: false }, // 4
      ],
    ];

    const selectedTexts = [
      [0, 3],
    ];
    expect(getSelectedTexts(wordLetters)).to.eql(selectedTexts);
  });
});
