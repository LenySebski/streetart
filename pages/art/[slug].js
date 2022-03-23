/* eslint-disable react/prop-types */
import Link from 'next/link';
import React, { useState } from 'react';
import {
  ArtCardFull,
  ArtWidget,
  Categories,
  CommentForm,
  Comments,
  MapView,
} from '../../components';
import { getArts, getArtDetails } from '../../services';
import styles from '../../styles/SingleArtPage.module.css';

export default function SingleArtPage({ art }) {
  const [selectedArt, setSelectedArt] = useState(null);

  const onMarkerClick = (e) => {
    console.log(e);
    setSelectedArt(e);
    console.log({ selectedArt });
  };

  const [showContent, setShowContent] = useState(false);

  const onShowContentClick = (e) => {
    console.clear();
    setShowContent((prev) => !prev);
    console.log(e);
  };
  return (
    <div className={styles.mainContainer}>
      <div
        className={
          showContent
            ? `${styles.contentContainer} ${styles.showContent} `
            : `${styles.contentContainer}`
        }
      >
        <Link href="/">back Home</Link>
        <ArtCardFull art={art} />
        <CommentForm />
        <Comments />
        <ArtWidget
          slug={art.slug}
          categories={art.categories.map((category) => category.slug)}
        />
        <Categories />
      </div>
      <div className={styles.mapContainer}>
        <MapView>
          <button
            onClick={(e) => onShowContentClick(e)}
            className={
              showContent
                ? `${styles.mapButton}`
                : `${styles.mapButton} ${styles.blue}`
            }
          >
            {showContent ? 'Map View' : 'List View'}
          </button>
          {/* <ShowMarkers data={arts} onClick={(e) => onMarkerClick(e)} />
          {selectedArt && (
            <Popup
              anchor="bottom"
              longitude={selectedArt.geolocation.longitude}
              latitude={selectedArt.geolocation.latitude}
              closeOnClick={false}
              onClose={() => setSelectedArt(null)}
              maxWidth="160px"
              offset={[0, -25]}
            >
              <div>
                <h2>{selectedArt.title}</h2>
                <img
                  src={selectedArt.image[0].url}
                  alt={selectedArt.title}
                  width="100%"
                />
              </div>
            </Popup>
          )} */}
        </MapView>
      </div>
    </div>
  );
}
export async function getStaticProps({ params }) {
  const data = (await getArtDetails(params.slug)) || [];
  console.log({ data });
  return {
    props: { art: data },
  };
}

export async function getStaticPaths() {
  const arts = await getArts();
  console.log({ arts });
  return {
    paths: arts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
