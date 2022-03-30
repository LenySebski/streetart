/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getArts } from '../services';
import styles from './ArtWidget.module.css';

// eslint-disable-next-line no-unused-vars
const ArtWidget = ({ longitude, latitude }) => {
  const [artList, setArtList] = useState([]);

  useEffect(() => {
    getArts().then((result) => setArtList(result));
  }, []);

  return (
    <div className={styles.widgetContainer}>
      {artList.map(({ node }) => (
        <div key={node.slug}>
          <div className={styles.cardContainer}>
            <Image
              className={styles.image}
              alt={node.title}
              src={node.mainImage.url}
              width={400}
              height={400}
            />
            <div className={styles.infoContainer}>
              <p className={styles.distance}>
                {Math.floor(node.geolocation.distance)}m
              </p>
              <div className="artWidgetInfo">
                <h3 className={styles.title}>{node.title}</h3>
                <span>
                  {` by `}
                  {node.author[node.author.length - 1]}
                </span>
              </div>

              <Link href={`/art/${node.slug}`}>
                <button className="buttonPrimary">
                  <a>details</a>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtWidget;
