import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'redux';

import PrimaryButton from '../../supermodules/PrimaryButton';

import { changeToLogin } from '../../../redux/actions/popup';

const LoginButton = ({ text, onClick }) => (
  <PrimaryButton text={text} onClick={onClick} />
);

export default connect(
  null,
  dispatch => (
    {
      onClick: () => dispatch(changeToLogin()),
    }
  ),
)(LoginButton);

LoginButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
