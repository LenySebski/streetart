import React from 'react';
import Link from 'next/link';
import styles from './NavbarMobile.module.css';

const Navbar = () => (
  <nav className={styles.container}>
    <div>
      <Link href="/">
        <a>Map</a>
      </Link>
      <Link href="/gallery">
        <a>Gallery</a>
      </Link>
    </div>
  </nav>
);

export default Navbar;
