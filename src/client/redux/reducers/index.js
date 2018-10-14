import { combineReducers } from 'redux';

import popup from './popup';
import currentUser from './current-user';

export default combineReducers({
  popup,
  currentUser,
});
