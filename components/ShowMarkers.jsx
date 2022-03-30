import React from 'react';
import { Marker, useMap } from 'react-map-gl';
import Pin from './Pin';

const ShowMarkers = ({ data, onClick, selectedArt, setViewState }) => {
  const { current: map } = useMap();

  return data.map(({ node }) => (
    <Marker
      key={node.id}
      longitude={node.geolocation.longitude}
      latitude={node.geolocation.latitude}
      anchor="bottom"
    >
      <Pin
        selectedArt={selectedArt}
        node={node}
        onClick={() => {
          map.flyTo({
            center: [node.geolocation.longitude, node.geolocation.latitude],
            zoom: 13,
            speed: 0.25,
            curve: 0.6,
            essential: true,
          });
          onClick(node);
        }}
      />
    </Marker>
  ));
};
export default ShowMarkers;
