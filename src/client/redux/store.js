import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise-middleware';

import reducer from './reducers';

export default createStore(
  reducer,
  {},
  applyMiddleware(
    thunk,
    reduxPromise,
  ),
);
