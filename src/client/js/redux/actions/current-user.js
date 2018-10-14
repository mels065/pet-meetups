import axios from 'axios';

import { ACTIONS } from '../../../../config';
import { racePromise } from '../../../../utils';

export default {
  fetchCurrentUser: () => (
    {
      type: ACTIONS.CURRENT_USER.FETCH_CURRENT_USER,
      payload: racePromise(axios.get, ['/api/auth/user']),
    }
  ),
};
