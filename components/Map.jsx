import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { getArts } from '../services';

const Map = ({ arts }) => {
  console.log(arts)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.googleMapsApi
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: 67.14620886004359,
    lng: -23.9258930209502
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >

            {/* <InfoWindow
							//onClose={this.onInfoWindowClose}
							position={{ lat: 64.14620886004359, lng: -21.9258930209502 }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ "hi" }</span>
							</div>
						</InfoWindow> */}

        {  <Marker
        position={{ lat: arts[0].node.geolocation.latitude, lng: arts[0].node.geolocation.longitude }}
        icon={{
          url: image,
          anchor: new google.maps.Point(5, 58),
        }}
      />}
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map