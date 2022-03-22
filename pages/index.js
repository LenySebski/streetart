import React, { useState } from 'react';
import Head from 'next/head';
import ReactMapGL, { Marker, GeolocateControl, Popup } from 'react-map-gl';
import { getArts } from '../services';
import ShowMarkers from '../components/ShowMarkers';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArtCardSmall } from '../components';
import styles from '../styles/Home.module.css';
import Link from 'next/link'

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function App({ arts }) {
  // arts.map((art) => console.log(art.node));

  const [viewState, setViewState] = React.useState({
    latitude: 64.12914739924277,
    longitude: -21.918358129291008,
    zoom: 11,
  });

  const [selectedArt, setSelectedArt] = useState(null);

  const onMarkerClick = (e) => {
    console.log(e);
    setSelectedArt(e);
    console.log({ selectedArt });
  };
  return (
    //<div className={styles.gridLayout}>
  <>
  <Link href="/list">
    <div className={styles.ArtCardSmall}>
        {arts.map((art) => (
          
          <ArtCardSmall art={art.node} />
          
        ))}
      </div>
      </Link>

      <ReactMapGL
        {...viewState}
        style={{  width: "40%", height: "90%", marginLeft: "52.5vw", position: "absolute", top: "5vh" }}
        mapboxAccessToken={token}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/lenysebski/ckwz8y8c011bk14mu07wfzmm8"
        // standard map style:
        // mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        
        <Marker latitude="64.12914739924277" longitude="-21.918358129291008" />
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
            <Link href="/list">
            <div>
              <h2>{selectedArt.title}</h2>
              <img
                src={selectedArt.image[0].url}
                alt={selectedArt.title}
                width="100%"
              />
            </div>
            </Link>
          </Popup>
          
        )}
        <GeolocateControl />
      </ReactMapGL>
      </>
    //</div>
  );
}

export async function getStaticProps() {
  const arts = (await getArts()) || [];

  return {
    props: { arts },
  };
}



