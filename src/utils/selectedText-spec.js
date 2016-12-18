import { expect } from 'chai';
import { makePassageChunks } from './selectedText';

describe('#makePassageChunks', () => {
  const passage = '0123456789';

  it('handles simple', () => {
    const selectedTexts = [[2, 6]];
    const chunks = [
      { isSelected: false, text: '01' },
      { isSelected: true, text: '2345' },
      { isSelected: false, text: '6789' },
    ];
    expect(makePassageChunks({ selectedTexts, passage })).to.eql(chunks);
  });

  it('handles first', () => {
    const selectedTexts = [[0, 5]];
    const chunks = [
      { isSelected: true, text: '01234' },
      { isSelected: false, text: '56789' },
    ];
    expect(makePassageChunks({ selectedTexts, passage })).to.eql(chunks);
  });

  it('handles one character', () => {
    const selectedTexts = [[0, 1], [9, 10]];
    const chunks = [
      { isSelected: true, text: '0' },
      { isSelected: false, text: '12345678' },
      { isSelected: true, text: '9' },
    ];
    expect(makePassageChunks({ selectedTexts, passage })).to.eql(chunks);
  });

  it('handles complicated', () => {
    const selectedTexts = [[1, 2], [4, 5], [7, 9]];
    const chunks = [
      { isSelected: false, text: '0' },
      { isSelected: true, text: '1' },
      { isSelected: false, text: '23' },
      { isSelected: true, text: '4' },
      { isSelected: false, text: '56' },
      { isSelected: true, text: '78' },
      { isSelected: false, text: '9' },
    ];
    expect(makePassageChunks({ selectedTexts, passage })).to.eql(chunks);
  });

  it('handles none', () => {
    const selectedTexts = [];
    const chunks = [
      { isSelected: false, text: '0123456789' },
    ];
    expect(makePassageChunks({ selectedTexts, passage })).to.eql(chunks);
  });
});
