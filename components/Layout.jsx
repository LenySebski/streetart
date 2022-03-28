/* eslint-disable react/prop-types */
import React from 'react';
import { Navbar } from '.';

const Layout = ({ children }) => (
  <>
    {children}
    <Navbar />
  </>
);

export default Layout;
