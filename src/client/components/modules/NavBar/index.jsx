import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Logo from './Logo';
import NavMenu from './NavMenu';

const NavBar = ({ currentUser }) => (
  currentUser
    ? (
      <nav>
        <Logo />
        <NavMenu />
      </nav>
    )
    : null
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
