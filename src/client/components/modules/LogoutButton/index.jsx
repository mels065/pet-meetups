import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeCurrentUser } from '../../../redux/actions/current-user';

import { LOCAL_STORAGE_KEYS } from '../../../../constants/values';

const LogoutButton = ({ onClick }) => (
  <li className="logout-btn">
    <button type="button" onClick={onClick}>Logout</button>
  </li>
);

export default connect(
  null,
  dispatch => (
    {
      onClick: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
        dispatch(removeCurrentUser());
      },
    }
  ),
)(LogoutButton);

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
