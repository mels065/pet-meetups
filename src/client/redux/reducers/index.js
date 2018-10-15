import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import popup from './popup';
import currentUser from './current-user';

export default combineReducers({
  popup,
  currentUser,
  routing,
});
