import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import logIn from './logIn'
import users from './users'
import current from './current'
import poems from './poems'
import selectablePoem from './selectablePoem'

export default combineReducers({
  current,
  logIn,
  users,
  poems,
  selectablePoem,
  routing: routerReducer,
})
