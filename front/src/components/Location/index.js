import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const Location = () => {
  // We use useMap to locate the user
  // and center the map on his position
  const map = useMap();

  // function to handle the location found event
  const handleLocationFound = (event) => {
    map.flyTo(event.latlng, map.getZoom());
  };

  useEffect(() => {
    map.locate().on('locationfound', handleLocationFound);
  }, [map]);

  // // On first render, we try to set position to user position
  // // and we
  // useEffect(() => {
  //   // We check if geolocation is enabled in navigator
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((pos) => {
  //       setPosition([pos.coords.latitude, pos.coords.longitude]);
  //     });
  //   }
  // }, []);
  return null;
};

export default Location;
