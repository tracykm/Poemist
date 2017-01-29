module.exports = {
  currentPoemViewed: poemId => (
    {
      type: 'CURRENT_POEM_VIEWED',
      poemId,
    }
  ),
};
