import ACTIONS from '../../../constants/actions';

export default (state = {
  error: null,
  user: null,
  loading: false,
}, action) => {
  switch (action.type) {
    case `${ACTIONS.CURRENT_USER.FETCH_CURRENT_USER}_PENDING`: {
      return {
        ...state,
        error: null,
        user: null,
        loading: true,
      };
    }
    case `${ACTIONS.CURRENT_USER.FETCH_CURRENT_USER}_FULFILLED`: {
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
      };
    }
    case `${ACTIONS.CURRENT_USER.FETCH_CURRENT_USER}_REJECTED`: {
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
