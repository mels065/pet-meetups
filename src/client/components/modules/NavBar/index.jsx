import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavMenu from '../NavMenu';

const NavBar = ({ currentUser }) => (
  currentUser
    ? (
      <nav className="nav-bar">
        <div className="logo-content">
          <img src="" alt="PetMeetups" />
          <h1>Pet Meetups</h1>
        </div>
        <NavMenu />
      </nav>
    ) : null
);

export default NavBar;

connect(
  props => (
    {
      currentUser: props.currentUser.user,
    }
  ),
)(NavBar);

NavBar.propTypes = {
  currentUser: PropTypes.shape(),
};

NavBar.defaultProps = {
  currentUser: null,
};
