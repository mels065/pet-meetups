import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ currentUser }) => (
  currentUser
    ? (
      <header id="Header">
        <div className="header-contents" />
      </header>
    )
    : null
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
