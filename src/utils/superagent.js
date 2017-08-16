import request from 'superagent'

function setCsrfToken() {
  let token = 'fakeToken'
  if (!global.TEST_ENV) {
    const elem = document.querySelector('meta[name="csrf-token"]') // for fake
    token = elem && elem.getAttribute('content')
    token = token || localStorage.getItem('session');
  }
  this.set('X-CSRF-Token', token)
  this.set('X-Key-Inflection', 'camel')
  return this
}
function csrf(superagent) {
  /* eslint no-param-reassign: 1 */
  superagent.Request.prototype.setCsrfToken = setCsrfToken
  return superagent
}
csrf(request)

export const baseUrl = 'http://localhost:3000/api'

export default request
