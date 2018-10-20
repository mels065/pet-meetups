import React from 'react';
import PropTypes from 'prop-types';

// icon is class names
const LandingInfo = ({ icon, text }) => (
  <figure className="landing-info">
    <div className="landing-info-icon">
      {icon}
    </div>
    <figcaption>
      {text}
    </figcaption>
  </figure>
);

export default LandingInfo;

LandingInfo.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
};
