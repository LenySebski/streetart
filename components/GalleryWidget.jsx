/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getSearchResults } from '../services';
import styles from './GalleryWidget.module.css';
import LikeButton from './LikeButton';

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
        {artResults.map((art) => 

          // eslint-disable-next-line @next/next/link-passhref
            {console.log(art)
              
              return <div className={styles.artContainer}>
                <div className={styles.imageContainer}>
                  <Image width={400} height={400} src={art.mainImage.url} />
                </div>
                <div className={styles.artInfo}>
                <Link href={`/art/${art.slug}`} key={art.title}>
            <a className={styles.link}>
                <h3 className={styles.title}>{art.title}</h3>
            </a>
          </Link>
          <LikeButton art={art}/>
                </div>
              </div>}
        )}
      </div>
      <div className={styles.bigDecoration} />
    </div>
  );
};

export default GalleryWidget;
