module.exports = {
  _toggleShowLogin: () => (
    {
      type: 'LOG_IN_TOGGLED',
    }
  ),
  _showOnSignUp: errors => (
    {
      type: 'SHOW_ON_SIGN_UP',
      errors: (typeof errors === 'string' ? errors : null),
      // hack for dispach getting passed when nothing else
    }
  ),
  _showOnLogin: errors => (
    {
      type: 'SHOW_ON_LOG_IN',
      errors: (typeof errors === 'string' ? errors : null),
    }
  ),
}
