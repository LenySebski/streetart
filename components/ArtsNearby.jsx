/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-carousel-light';
import { getArtsNearby } from '../services';
import styles from './ArtsNearby.module.css';

const ArtsNearby = ({ title, slug, longitude, latitude }) => {
  const [relatedArts, setRelatedArts] = useState([]);
  useEffect(() => {
    getArtsNearby(slug, longitude, latitude).then((result) =>
      setRelatedArts(result)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <div className={styles.widgetContainer}>
      <div className={styles.carouselTitle}>
        <svg
          className={styles.oppositeArrows}
          width="34"
          height="18"
          viewBox="0 0 34 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 1V10C0 10.5523 0.447715 11 1 11C1.55228 11 2 10.5523 2 10V3.41421L11.1119 12.5261L0.730401 15.4356C0.198606 15.5847 -0.11168 16.1366 0.0373586 16.6684C0.186397 17.2002 0.738322 17.5105 1.27012 17.3614L12.7343 14.1485L15.6914 17.1056C16.0819 17.4962 16.7151 17.4962 17.1056 17.1056C17.4962 16.7151 17.4962 16.0819 17.1056 15.6914L14.9436 13.5294L30.7556 9.09797L27.5282 14.8387C27.2575 15.3202 27.4284 15.9298 27.9098 16.2005C28.3912 16.4711 29.0009 16.3003 29.2715 15.8189L33.682 7.97363C33.9527 7.49221 33.7818 6.88254 33.3004 6.61189L25.4552 2.20139C24.9738 1.93074 24.3641 2.10161 24.0934 2.58303C23.8228 3.06445 23.9936 3.67413 24.4751 3.94478L30.2158 7.17217L13.3212 11.907L3.41421 2H10C10.5523 2 11 1.55228 11 1C11 0.447715 10.5523 0 10 0H1C0.447715 0 0 0.447715 0 1Z"
            fill="#CCFF02"
          />
        </svg>
        <h3>Other Art nearby {title}: </h3>
      </div>
      <Carousel
        navButtonScrollLength={900}
        navButtonScrollDuration={500}
        easing="in-out-cube"
        navButtonIconColor="#425e7a"
        navButtonIconSize="25"
      >
        {relatedArts.map((art) => (
          <div key={art.slug}>
            <div className={styles.cardContainer}>
              <Image
                className={styles.image}
                alt={art.title}
                src={art.mainImage.url}
                width={150}
                height={150}
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
      </Carousel>
    </div>
  );
};
export default ArtsNearby;
