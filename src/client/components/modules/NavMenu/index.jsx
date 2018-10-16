import React from 'react';

import NavMenuLink from '../NavMenuLink';

const NavMenu = () => (
  <div className="nav-menu">
    <ul>
      <NavMenuLink text="Messages" link="/messages" />
      <NavMenuLink text="Profile" link="/profile" />
      <NavMenuLink text="Account" link="/account" />
    </ul>
  </div>
);

export default NavMenu;
