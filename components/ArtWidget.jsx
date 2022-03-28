/* eslint-disable react/prop-types */
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { getRecentArts, getSimilarArts } from '../services';
import styles from './ArtWidget.module.css';

const ArtWidget = ({ slug, longitude, latitude }) => {
  const [relatedArts, setRelatedArts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarArts(slug, longitude, latitude).then((result) =>
        setRelatedArts(result)
      );
    } else {
      getRecentArts().then((result) => setRelatedArts(result));
    }
  }, [slug]);

  return (
    <div className={styles.widgetContainer}>
      <h3>
        {slug ? 'Other pieces other pieces close by:' : 'Recently added:'}{' '}
      </h3>
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
              <p className={styles.date}>
                {moment(art.createdAt).format('DD.MM.YYYY')}
              </p>
              <Link href={`/art/${art.slug}`}>
                <a className={styles.title}>{art.title}</a>
              </Link>
              <span>{` by `}</span>
              {art.author.length ? (
                art.author.join(',')
              ) : (
                // art.author.map((author) => <p>{author}</p>)
                <p>Unkown</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtWidget;
