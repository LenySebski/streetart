import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => (
  <nav className={styles.container}>
    <div className="menu">
      <Link href="/">
        <a className={styles.navbarLink}>Map</a>
      </Link>
      <Link href="/gallery">
        <a className={styles.navbarLink}>Gallery</a>
      </Link>
    </div>
    <Link href="/">
      <button className={styles.loginBtn}>Log in</button>
    </Link>
  </nav>
);

export default Navbar;
