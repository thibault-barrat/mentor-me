/* eslint-disable max-len */
/* eslint-disable keyword-spacing */
import {
  MapContainer, Marker, Popup, TileLayer,
} from 'react-leaflet';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { likeService, unlikeService } from 'src/actions/service';
import './style.scss';

export default function serviceId() {
  const services = useSelector((state) => state.services.items);
  const { id } = useParams();
  const foundService = services.find((service) => service.id === parseInt(id, 10));
  // Here we get the likedServices infos from the reducer
  const likedServices = useSelector((state) => state.user.likedServices);
  // Here the state we use to change the liked heart css
  const [isLiked, setIsLiked] = useState(likedServices.some((service) => service.service_id === foundService.id));

  const dispatch = useDispatch();

  return(
    <>
      {foundService && (
      <div className="container__all">
        <div className="desc__block">
          <div className="desc__container">
            {isLiked ? (
              <AiFillHeart
                className="likedHeart"
                size={23}
                onClick={() => {
                  dispatch(unlikeService(foundService.id));
                  setIsLiked(false);
                }}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => {
                  dispatch(likeService(foundService.id));
                  setIsLiked(true);
                }}
                size={23}
              />
            )}
            <h1 className="desc__item user__title">{foundService.title}</h1>
            <p className="desc__item desc__text__s">{foundService.description}</p>
            <span className="desc__item"> Durée : {foundService.duration} minutes</span>
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
