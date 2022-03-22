import React from 'react';
import { Navbar, Footer } from '.';
import Header from './Header';

const Layout = ({ children }) => (
  <>
   
    {children}
    <Navbar />
    <Footer />
  </>
);

export default Layout;
