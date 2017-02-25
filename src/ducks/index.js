import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import login from './login';
import users from './users';
import current from './current';
import poems from './poems';
import stylingPoem from './stylingPoem';
import selectablePoem from './selectablePoem';

module.exports = combineReducers({
  current,
  login,
  users,
  poems,
  stylingPoem,
  selectablePoem,
  routing: routerReducer,
});
