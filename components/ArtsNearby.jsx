/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getArtsNearby } from '../services';
import styles from './ArtWidget.module.css';

const ArtsNearby = ({ title, slug, longitude, latitude }) => {
  const [relatedArts, setRelatedArts] = useState([]);

  useEffect(() => {
    getArtsNearby(slug, longitude, latitude).then((result) =>
      setRelatedArts(result)
    );
  }, [slug]);

  return (
    <div className={styles.widgetContainer}>
      <h3>Other pieces other pieces close to {title}: </h3>
      {relatedArts.map((art) => (
        <div key={art.slug}>
          <div className={styles.cardContainer}>
            <Image
              className={styles.image}
              alt={art.title}
              src={art.mainImage.url}
              width={400}
              height={400}
            />
            <div className={styles.infoContainer}>
              <Link href={`/art/${art.slug}`}>
                <a className={styles.title}>{art.title}</a>
              </Link>
              <p>{Math.floor(art.geolocation.distance)} m</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtsNearby;
