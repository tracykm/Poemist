import { combineReducers } from 'redux';

import login from './login';
import currentUser from './currentUser';
import poems from './poems';
import currentPoem from './currentPoem';
import selectablePoem from './selectablePoem';

module.exports = combineReducers({
  login,
  currentUser,
  currentPoem,
  poems,
  selectablePoem,
});
