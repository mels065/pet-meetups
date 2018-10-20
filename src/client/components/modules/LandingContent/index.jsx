import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faDragon } from '@fortawesome/free-solid-svg-icons';

import LandingInfo from './LandingInfo';

const LandingContent = () => (
  <div className="landing-content">
    <LandingInfo
      icon={<FontAwesomeIcon icon={faDog} />}
      text="Find fellow pet owners in your area!"
    />
    <LandingInfo
      icon={<FontAwesomeIcon icon={faCat} />}
      text="Connect with people that love their pets as much as you!"
    />
    <LandingInfo
      icon={<FontAwesomeIcon icon={faDragon} />}
      text="All pets welcome!"
    />
  </div>
);

export default LandingContent;
