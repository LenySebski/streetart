import React from 'react';
import { Marker } from 'react-map-gl';
import Pin from './Pin';

const ShowMarkers = ({ data, onClick, setViewState }) =>
  data.map(({ node }) => (
    <Marker
      key={node.id}
      longitude={node.geolocation.longitude}
      latitude={node.geolocation.latitude}
      anchor="bottom"
    >
      <Pin onClick={() => onClick(node)} />
    </Marker>
  ));
export default ShowMarkers;
