module.exports = {
  toggleLogin: () => (
    {
      type: 'LOGIN_TOGGLED',
    }
  ),
  makeCurrentPoemSelectable: currentPoem => (
    {
      type: 'MAKE_CURRENT_POEM_SELECTABLE',
      currentPoem,
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
};
