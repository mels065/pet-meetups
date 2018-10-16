import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

const DangerButton = ({ text, onClick }) => (
  <Button className="btn-danger" text={text} onClick={onClick} />
);

DangerButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};
