import { combineReducers } from 'redux';

import login from './login';
import currentUser from './currentUser';
import current from './current';
import poems from './poems';
import stylingPoem from './stylingPoem';
import selectablePoem from './selectablePoem';

module.exports = combineReducers({
  login,
  currentUser,
  current,
  stylingPoem,
  poems,
  selectablePoem,
});
