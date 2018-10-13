import { ACTIONS } from '../../../../config';

export default {
  changeToRegister: () => (
    {
      type: ACTIONS.POPUP.CHANGE_TO_REGISTER,
    }
  ),
  changeToLogin: () => (
    {
      type: ACTIONS.POPUP.CHANGE_TO_LOGIN,
    }
  ),
  exitPopup: () => (
    {
      type: ACTIONS.POPUP.EXIT_POPUP,
    }
  ),
};
