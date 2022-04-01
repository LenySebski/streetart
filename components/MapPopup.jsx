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
      <h2 className="popupTitle">
        <span className={styles.title}>{art.title}</span>
        <p className="popupAuthor">
          by {art.author[art.author.length - 1]} {art.year && `(${art.year})`}
        </p>
      </h2>

      <Link href={`/art/${art.slug}`}>
        <button className="buttonPrimary">
          <a>see more</a>
        </button>
      </Link>
    </div>
  </div>
);
export default MapPopup;
