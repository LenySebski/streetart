import React from 'react';
import useGeolocation from '../components/useGeolocation';

export default function Geo(params) {
  const geo = useGeolocation();
  console.log(geo);
  console.log(geo);
  return <div />;
}
