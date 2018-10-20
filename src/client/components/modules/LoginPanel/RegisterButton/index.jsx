import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux';

import PrimaryButton from '../../../supermodules/Button/PrimaryButton';

import { changeToRegister } from '../../../../redux/actions/popup';

const LoginButton = ({ text, onClick }) => (
  <PrimaryButton text={text} onClick={onClick} />
);

export default connect(
  null,
  dispatch => (
    {
      onClick: () => dispatch(changeToRegister()),
    }
  ),
)(LoginButton);

LoginButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
