/* eslint-disable keyword-spacing */
import {
  MapContainer, Marker, Popup, TileLayer, useMapEvents,
} from 'react-leaflet';
import { useState } from 'react';
import './style.scss';

const serviceId = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>le mentor est disponible dans cette zone</Popup>
      </Marker>
    );
  }

  return(
    <div className="container">
      <div className="desc__block">
        <img className="desc__imgs" src="" alt="catégorie" />
        <div className="desc__container">
          <h1 className="desc__item">Titre</h1>
          <p className="desc__item">description de l'offre</p>
          <span className="desc__item">Durée :</span>
          <span className="desc__item">Disponibilité</span>
          <button type="button"> Prendre contact</button>
        </div>
      </div>
      <div className="leaflet__block">
        <MapContainer center={[48.8534, 2.3488]} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </div>
      <div className="user__block">
        <h1>Proposé par : </h1>
        <img src="" alt="mentor img" />
        <p>description / bio du mentor</p>
      </div>
    </div>
  );
};

export default serviceId;
