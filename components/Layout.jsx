import React from 'react';
import { Navbar, Footer } from '.';

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
