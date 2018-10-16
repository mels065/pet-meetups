import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TITLE } from '../../../../constants/meta';

const Hero = ({ currentUser }) => (
  !currentUser
    ? (
      <div className="hero">
        <h1>{TITLE}</h1>
      </div>
    )
    : null
);

export default connect(
  props => (
    {
      currentUser: props.currentUser.user,
    }
  ),
)(Hero);

Hero.propTypes = {
  currentUser: PropTypes.shape(),
};

Hero.defaultProps = {
  currentUser: null,
};
