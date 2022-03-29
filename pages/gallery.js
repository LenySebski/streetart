import React from 'react';
import { GalleryWidget } from '../components';
import styles from '../styles/Gallery.module.css';

const gallery = () => (
  <div className={styles.content}>
    <GalleryWidget />
  </div>
);

export default gallery;
