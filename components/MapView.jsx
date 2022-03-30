import Map, { useMap, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView({ children }) {
  const [viewState, setViewState] = useState({
    latitude: 64.12914739924277,
    longitude: -21.918358129291008,
    zoom: 11,
  });
  return (
    <Map
      id="mymap"
      reuseMaps
      {...viewState}
      style={{ width: '100%', height: '95vh' }}
      onMove={(evt) => {
        setViewState(evt.viewState);
      }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/lenysebski/ckwz8y8c011bk14mu07wfzmm8"
      mapboxAccessToken={token}
    >
      {children}

      <GeolocateControl />
    </Map>
  );
}
