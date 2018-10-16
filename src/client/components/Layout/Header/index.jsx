import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from '../../modules/NavBar';

const Header = ({ currentUser }) => (
  currentUser
    ? (
      <header id="Header">
        <NavBar />
      </header>
    )
    : <header id="Header" />
);

export default connect(
  state => (
    { currentUser: state.currentUser.user }
  ),
)(Header);

Header.propTypes = {
  currentUser: PropTypes.shape(),
};

Header.defaultProps = {
  currentUser: null,
};
