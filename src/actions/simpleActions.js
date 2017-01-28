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
