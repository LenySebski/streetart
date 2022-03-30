/* eslint-disable react/prop-types */
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getArts } from '../services';
import styles from './ArtWidget.module.css';

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
              <h3 className={styles.title}>{node.title}</h3>
              <span>{` by `}</span>
              {node.author[node.author.length - 1]}
              <Link href={`/art/${node.slug}`}>
                <button>
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
