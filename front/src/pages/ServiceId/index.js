/* eslint-disable keyword-spacing */
import {
  MapContainer, Marker, Popup, TileLayer, useMapEvents,
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import avatarimg from '../../assets/images/business-gfb594ee9b_1280.jpg';
import './style.scss';

export default function serviceId() {
  const services = useSelector((state) => state.services.items);
  const { id } = useParams();
  const foundService = services.find((service) => service.id === parseInt(id, 10));

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
    <>
      {foundService && (
      <div className="container__all">
        <div className="desc__block">
          <div className="desc__container">
            <AiOutlineHeart />
            <h1 className="desc__item user__title">{foundService.title}</h1>
            <p className="desc__item">{foundService.description}</p>
            <span className="desc__item">{foundService.duration}</span>
            <button className="connect-button" type="button"> Prendre contact</button>
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
          <h1 className="user__title">Proposé par : </h1>
          <img className="user__img" src={avatarimg} alt="mentor img" />
          <p className="user__desc">description / bio du mentor</p>
        </div>
      </div>
      )}
    </>
  );
}
