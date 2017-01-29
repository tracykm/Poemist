module.exports = {
  makeCurrentPoemSelectable: poemId => (
    {
      type: 'MAKE_CURRENT_POEM_SELECTABLE',
      poemId,
    }
  ),
  makePoemUnselectable: selectablePoem => (
    {
      type: 'MAKE_POEM_UNSELECTABLE',
      selectablePoem,
    }
  ),
  toggleSelectedLetters: letters => (
    {
      type: 'TOGGLE_SELECTED_LETTERS',
      letters,
    }
  ),
  toggleSelectBy: () => (
    {
      type: 'TOGGLE_SELECT_BY',
    }
  ),
  updateStyle: backgroundId => (
    {
      type: 'UPDATE_STYLE',
      backgroundId,
    }
  ),
  updateColor: colorRange => (
    {
      type: 'UPDATE_COLOR',
      colorRange,
    }
  ),
};
