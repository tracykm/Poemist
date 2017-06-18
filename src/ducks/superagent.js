import request from 'superagent'

function setCsrfToken() {
  let token = 'fakeToken'
  if (!global.TEST_ENV) {
    token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  }
  this.set('X-CSRF-Token', token)
  return this
}
const csrf = function (superagent) {
  superagent.Request.prototype.setCsrfToken = setCsrfToken
  return superagent
}
csrf(request)

export default request
