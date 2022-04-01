import React from 'react';
import Head from 'next/head';
import { GalleryWidget } from '../components';
import styles from '../styles/Gallery.module.css';

const gallery = () => (
  <div className={styles.content}>
    <Head>
      <title>Reykjavik StreetArt Gallery</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <GalleryWidget className={styles.widgetContainer} />
  </div>
);

export default gallery;
