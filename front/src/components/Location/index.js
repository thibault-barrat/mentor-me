import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import { updateUserLocation } from '../../actions/user';

const Location = () => {
  // We use useMap to locate the user
  // and update his position in the store
  const map = useMap();

  const dispatch = useDispatch();

  // function to handle the location found event
  // and dispatch the action to update the user location
  const handleLocationFound = (event) => {
    map.setView(event.latlng, 13);
    dispatch(updateUserLocation(event.latitude, event.longitude));
  };

  useEffect(() => {
    map.locate().on('locationfound', handleLocationFound);
  }, [map]);

  return null;
};

export default Location;
