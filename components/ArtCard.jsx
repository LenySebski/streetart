import React from 'react';
import Image from 'next/image';
import styles from './ArtCard.module.css';

console.log({ styles });
const ArtCard = ({ art }) => (
  <div>
    <h2 className={styles.title}>Title: {art.title}</h2>
    <h2>
      Artist:{' '}
      {art.author.map((artist) => (
        <span>{artist} </span>
      ))}
    </h2>
    <h3>Latitude: {art.geolocation.latitude}</h3>
    <h3>Longitude: {art.geolocation.longitude}</h3>
    <Image width={200} height={200} src={art.image[0].url} />
  </div>
);

export default ArtCard;
