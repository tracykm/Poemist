var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var LoginErrorStore = new Store(AppDispatcher);

var _errors = {};

LoginErrorStore.all = function(){
  return _errors;
};

LoginErrorStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case "LOGIN_ERROR_RECEIVED":
      _errors = payload.error;
      debugger
      LoginErrorStore.__emitChange();
      break;
    case "CURRENT_USER_RECEIVED":
      _errors = "Success";
      LoginErrorStore.__emitChange();
      break;
  }
};

module.exports = LoginErrorStore;
