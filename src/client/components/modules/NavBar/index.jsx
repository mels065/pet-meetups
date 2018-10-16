import React from 'react';
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
