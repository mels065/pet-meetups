import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavMenuLink = ({ text, link }) => (
  <li className="nav-menu-link">
    <NavLink exact to={link} activeClassName="selected">{text}</NavLink>
  </li>
);

export default NavMenuLink;

NavMenuLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
