/* eslint-disable react/prop-types */
import React from 'react';
import { Navbar, NavbarMobile } from '.';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <NavbarMobile />
  </>
);

export default Layout;
