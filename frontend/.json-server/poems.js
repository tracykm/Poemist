const passage = 'the first selected word'

module.exports = [
  {
    id: 1,
    bookId: 2,
    bookTitle: 'An Awesome Book',
    authorId: 1,
    backgroundId: 3,
    colorRange: 3,
    textChunks: [
      { text: 'the first ', isSelected: false },
      { text: 'selected ', isSelected: true },
      { text: 'word ', isSelected: false },
    ],
    passage,
  },
  {
    id: 2,
    bookId: 2,
    bookTitle: 'An Awesome Book',
    authorId: 2,
    backgroundId: 1,
    colorRange: 5,
    textChunks: [
      { text: 'the first ', isSelected: true },
      { text: 'selected ', isSelected: false },
      { text: 'word ', isSelected: true },
    ],
    passage,
  },
  {
    id: 3,
    bookId: 2,
    bookTitle: 'An Awesome Book',
    authorId: 2,
    backgroundId: 7,
    colorRange: 8,
    textChunks: [{ text: 'the first selected word', isSelected: false }],
    passage,
  },
]
