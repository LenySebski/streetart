/* eslint-disable react/prop-types */
import React from 'react';
import Head from 'next/document';
import { Navbar } from '.';

const Layout = ({ children }) => (
  <>
    {children}
    <Navbar />
  </>
);

export default Layout;
