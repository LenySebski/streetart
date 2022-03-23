import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl';
import styles from '../styles/Home.module.css';

import {
  Navbar,
  ArtCard,
  ShowMarkers,
  ArtWidget,
  Categories,
  MapView,
} from '../components';
import { getArts } from '../services';

export default function Home({ arts }) {
  console.log(arts);
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
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={
          showContent
            ? `${styles.contentContainer} ${styles.showContent} `
            : `${styles.contentContainer}`
        }
      >
        <ArtWidget />
        <ArtWidget />
        <ArtWidget />
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
          <ShowMarkers data={arts} onClick={(e) => onMarkerClick(e)} />
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
          )}
        </MapView>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const arts = (await getArts()) || [];

  return {
    props: { arts },
  };
}
