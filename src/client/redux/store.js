import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise-middleware';
import { routerMiddleware } from 'react-router-redux';

import reducer from './reducers';

export default browserHistory => createStore(
  reducer,
  {},
  applyMiddleware(
    routerMiddleware(browserHistory),
    thunk,
    reduxPromise,
  ),
);
