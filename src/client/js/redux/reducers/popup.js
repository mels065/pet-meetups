import { ACTIONS, VALUES } from '../../../../config';

export default (state = {
  display: VALUES.REDUX.POPUP.NORMAL,
}, action) => {
  switch (action.type) {
    case ACTIONS.POPUP.CHANGE_TO_REGISTER: {
      return { ...state, display: VALUES.REDUX.POPUP.REGISTER };
    }
    case ACTIONS.POPUP.CHANGE_TO_LOGIN: {
      return { ...state, display: VALUES.REDUX.POPUP.LOGIN };
    }
    case ACTIONS.POPUP.EXIT_POPUP: {
      return { ...state, display: VALUES.REDUX.POPUP.NORMAL };
    }
    default: {
      return state;
    }
  }
};
