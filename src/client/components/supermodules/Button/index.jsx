import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick }) => (
  <button type="button" onClick={onClick}>
    {text}
  </button>
);

export default Button;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
