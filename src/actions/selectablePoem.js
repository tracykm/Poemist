module.exports = {
  _makeCurrentPoemSelectable: poemId => (
    {
      type: 'MAKE_CURRENT_POEM_SELECTABLE',
      poemId,
    }
  ),
  _makePoemUnselectable: selectablePoem => (
    {
      type: 'MAKE_POEM_UNSELECTABLE',
      selectablePoem,
    }
  ),
  _toggleSelectedLetters: letters => (
    {
      type: 'TOGGLE_SELECTED_LETTERS',
      letters,
    }
  ),
  _toggleSelectBy: () => (
    {
      type: 'TOGGLE_SELECT_BY',
    }
  ),
  _updateStyle: styleObj => (
    {
      type: 'UPDATE_STYLE',
      styleObj,
    }
  ),
}
