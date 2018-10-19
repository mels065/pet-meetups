import ACTIONS from '../../../constants/actions';

export const changeToRegister = () => (
  {
    type: ACTIONS.POPUP.CHANGE_TO_REGISTER,
  }
);

export const changeToLogin = () => (
  {
    type: ACTIONS.POPUP.CHANGE_TO_LOGIN,
  }
);

export const exitPopup = () => (
  {
    type: ACTIONS.POPUP.EXIT_POPUP,
  }
);
