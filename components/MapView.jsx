import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MapView({ children }) {
  return (
    <ReactMapGL
      reuseMaps
      initialViewState={{
        latitude: 64.12914739924277,
        longitude: -21.918358129291008,
        zoom: 11,
      }}
      style={{ width: '100%', height: '95vh' }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/lenysebski/ckwz8y8c011bk14mu07wfzmm8"
      mapboxAccessToken={token}
    >
      {children}

      <GeolocateControl />
    </ReactMapGL>
  );
}
