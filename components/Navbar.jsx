import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => (
  <div className={styles.container}>
    <ul className={styles.items}>
      <li >MAP</li>
      <li>GALLERY</li>
      <li>TOURS</li>
      <li>LISTS</li>
      <button>BUTTON</button>
    </ul>
    
  </div>
);

export default Navbar;
