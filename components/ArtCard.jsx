/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ArtCard.module.css';

const ArtCard = ({ art }) => (
  <Link href={`/art/${art.slug}`}>
    <a>
      <h2 className={styles.title}>Title: {art.title}</h2>
      <h2>
        Artist:{' '}
        {art.author.map((artist) => (
          <span>{artist} </span>
        ))}
      </h2>

      <Image
        className={styles.cardImage}
        width={200}
        height={200}
        src={art.image[0].url}
        blurDataURL={art.image[0].url}
        placeholder="blur"
      />
    </a>
  </Link>
);

export default ArtCard;
