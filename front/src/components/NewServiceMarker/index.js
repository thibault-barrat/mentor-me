import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeLocation } from '../../actions/service';

const NewServiceMarker = () => {
  const [position, setPosition] = useState(null);

  // we use the hook from react leaflet to get the map events
  // onclick we change the position variable
  // which will be used to create the marker
  useMapEvents({
    click(event) {
      setPosition(event.latlng);
    },
  });

  // when position changed we dispatch an action
  // to update location of the new service in the store
  const dispatch = useDispatch();
  useEffect(() => {
    if (position) {
      dispatch(changeLocation(position));
    }
  }, [position]);

  // if position is null we return null
  return position === null ? null : (
    <Marker position={position}>
      <Popup>Localisation de votre service</Popup>
    </Marker>
  );
};

export default NewServiceMarker;
