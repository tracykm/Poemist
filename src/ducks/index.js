import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import login from './login'
import users from './users'
import current from './current'
import poems from './poems'
import selectablePoem from './selectablePoem'

export default combineReducers({
  current,
  login,
  users,
  poems,
  selectablePoem,
  routing: routerReducer,
})
