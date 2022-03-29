/* eslint-disable react/prop-types */
import moment from 'moment';
import Image from 'next/image';
import styles from './ArtCardFull.module.css';

const ArtCardFull = ({ art }) => {
  console.log(art);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.mainImage}
          alt={art.title}
          src={art.mainImage.url}
          width={1200}
          height={900}
          blurDataURL={art.mainImage.url}
          placeholder="blur"
        />
      </div>
      <h3 className={styles.title}>
        {art.title}
        {art.year && `(${art.year})`}
      </h3>
      <h5 className={styles.artist}>
        by <span>{art.author.length ? art.author.join(' & ') : 'Unkown'}</span>
      </h5>
      <h5 className={styles.date}>
        Added on: {moment(art.createdAt).format('DD MMM YYYY')}
      </h5>
      <p>{art.description}</p>
    </div>
  );
};

export default ArtCardFull;
