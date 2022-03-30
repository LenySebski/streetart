/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getSearchResults } from '../services';
import styles from './GalleryWidget.module.css';

const GalleryWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artResults, setArtResults] = useState([]);

  useEffect(() => {
    getSearchResults(searchQuery).then((result) => setArtResults(result));
  }, [searchQuery]);

  return (
    <div className={styles.widgetContainer}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className={styles.searchBar}
          type="text"
          name="search"
          placeholder="search for the art"
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className={styles.galleryContainer}>
        {artResults.map((art) => (
          // eslint-disable-next-line @next/next/link-passhref
          <Link href={`/art/${art.slug}`}>
            <a className={styles.link}>
              <div className={styles.artContainer}>
                <div className={styles.imageContainer}>
                  <Image width={400} height={400} src={art.mainImage.url} />
                </div>
                <h3 className={styles.title}>{art.title}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className={styles.bigDecoration}>Image</div>
    </div>
  );
};

export default GalleryWidget;
