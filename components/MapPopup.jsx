import Link from 'next/link';
import React from 'react';
import styles from './MapPopup.module.css';

const MapPopup = ({ art }) => (
  <div className={styles.popupContainer}>
    <div className={styles.popupImageContainer}>
      <img
        className={styles.popupImage}
        src={art.mainImage.url}
        alt={art.title}
      />
    </div>
    <div className={styles.infoContainer}>
      <h2>
        <span className={styles.title}>{art.title}</span> by{' '}
        {art.author[art.author.length - 1]} {art.year && `(${art.year})`}
      </h2>

      <Link href={`/art/${art.slug}`}>
        <button className={styles.seeMoreBtn}>see more</button>
      </Link>
    </div>
  </div>
);
export default MapPopup;
