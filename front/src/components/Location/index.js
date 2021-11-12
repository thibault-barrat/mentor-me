import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import { updateUserLocation } from '../../actions/user';

const Location = () => {
  // We use useMap to locate the user
  // and center the map on his position
  const map = useMap();

  const dispatch = useDispatch();

  // function to handle the location found event
  const handleLocationFound = (event) => {
    map.setView(event.latlng, 13);
    dispatch(updateUserLocation(event.latitude, event.longitude));
    // map.flyTo(event.latlng, map.getZoom());
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
