/* eslint-disable max-len */
/* eslint-disable keyword-spacing */
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import './style.scss';

export default function serviceId() {
  const services = useSelector((state) => state.services.items);
  const { id } = useParams();
  const foundService = services.find((service) => service.id === parseInt(id, 10));

  /* function LocationMarker() {
    const map = useMap();
    map.flyTo([foundService.latitude, foundService.longitude], map.getZoom());

    return(
      <Marker position={[foundService.latitude, foundService.longitude]}>
        <Popup>le mentor est disponible dans cette zone</Popup>
      </Marker>
    );
  } */

  return(
    <>
      {foundService && (
      <div className="container__all">
        <div className="desc__block">
          <div className="desc__container">
            <AiOutlineHeart />
            <h1 className="desc__item user__title">{foundService.title}</h1>
            <p className="desc__item desc__text__s">{foundService.description}</p>
            <span className="desc__item">{foundService.duration}</span>
            <a href={`mailto:${foundService.email}`} className="connect-button" type="button"> contacter le mentor</a>
          </div>
        </div>
        <div className="leaflet__block">
          <MapContainer className="leaflet__map" center={[foundService.latitude, foundService.longitude]} zoom={13} scrollWheelZoom>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[foundService.latitude, foundService.longitude]}>
              <Popup>le mentor est disponible dans cette zone</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="user__block">
          <h1 className="user__title">Proposé par : {foundService.firstname} {foundService.lastname}</h1>
          <img className="user__img" src={foundService.avatar_url} alt="mentor img" />
          <p className="user__desc">{foundService.biography}</p>
        </div>
      </div>
      )}
    </>
  );
}
