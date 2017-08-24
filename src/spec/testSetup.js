import nock from 'nock'

global.TEST_ENV = true
const baseUrl = 'http://localhost:3000/api'

export const scope = nock(baseUrl)
  .defaultReplyHeaders({
    'X-Powered-By': 'Rails',
    'Content-Type': 'application/json',
  })

const fakeLocalStorage = {}
window.localStorage = { getItem: key => fakeLocalStorage[key], setItem: (key, val) => { fakeLocalStorage[key] = val } }
