module.exports = {
  _currentPoemViewed: poemId => (
    {
      type: 'CURRENT_POEM_VIEWED',
      poemId,
    }
  ),
};
