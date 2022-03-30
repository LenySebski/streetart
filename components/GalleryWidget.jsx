/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getSearchResults } from '../services';
import styles from './ArtWidget.module.css';

const GalleryWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artResults, setArtResults] = useState([]);

  useEffect(() => {
    getSearchResults(searchQuery).then((result) => setArtResults(result));
  }, [searchQuery]);

  return (
    <div className={styles.widgetContainer}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">
          <span className="hidden">Search art</span>
        </label>
        <input
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
            <Image width={400} height={400} src={art.mainImage.url} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GalleryWidget;
