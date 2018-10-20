import React from 'react';
import PropTypes from 'prop-types';

import Button from '../index';

const PrimaryButton = ({ text, onClick }) => (
  <Button className="btn-primary" text={text} onClick={onClick} />
);

export default PrimaryButton;

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
