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
  toggleSelectBy: () => (
    {
      type: 'TOGGLE_SELECT_BY',
    }
  ),
};
