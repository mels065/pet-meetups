import React from 'react';

import NavMenuLink from '../NavMenuLink';
import LogoutButton from '../LogoutButton';

const NavMenu = () => (
  <div className="nav-menu">
    <ul>
      <NavMenuLink text="Messages" link="/messages" />
      <NavMenuLink text="Profile" link="/profile" />
      <NavMenuLink text="Account" link="/account" />
      <LogoutButton />
    </ul>
  </div>
);

export default NavMenu;
