import React from 'react';
import { Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '250px',
  height: '300px',
};

const center = {
  lat: 51.954141,
  lng: 5.739911,
};

const position = {
  lat: 51.954141,
  lng: 5.739911,
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  const onLoad = (marker) => {
    console.log('marker: ', marker);
  };

  return isLoaded ? (
    <GoogleMap
      id='marker-example'
      mapContainerStyle={containerStyle}
      zoom={12}
      center={center}
    >
      <Marker onLoad={onLoad} position={position} />
    </GoogleMap>
  ) : (
    <>iets misgegaan</>
  );
}

export default React.memo(Map);
