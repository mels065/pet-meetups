import axios from 'axios';

import ACTIONS from '../../../constants/actions';
import { racePromise } from '../../../utils/async';

export const fetchCurrentUser = () => (
  {
    type: ACTIONS.CURRENT_USER.FETCH_CURRENT_USER,
    payload: racePromise(axios.get, ['/api/auth/fetch']),
  }
);

export const removeCurrentUser = () => (
  {
    type: ACTIONS.CURRENT_USER.REMOVE_CURRENT_USER,
  }
);
