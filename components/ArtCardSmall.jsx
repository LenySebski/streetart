import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
import styles from './ArtCardSmall.module.css';

const ArtCardSmall = ({ art }) => (
  <Link href="/list">
  <div className={styles.container} >
  <Image className={styles.image} width="300rem" height="200rem" src={art.image[0].url} />
    <div className={styles.vertical}>
    <h2>Title: {art.title}</h2>
    <h3 >
      Artist:{' '}
      {art.author.map((artist) => (
        <span>{artist} </span>
      ))}
    </h3>
    </div>
    
  </div>
  </Link>
);

export default ArtCardSmall;
