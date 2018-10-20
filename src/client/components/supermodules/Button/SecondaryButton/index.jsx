import React from 'react';
import PropTypes from 'prop-types';

import Button from '../index';

const SecondaryButton = ({ text, onClick }) => (
  <Button className="btn-secondary" text={text} onClick={onClick} />
);

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};
