import { MdOutlineClose } from 'react-icons/md';
import {
  MapContainer,
  Marker,
  TileLayer,
} from 'react-leaflet';
import PropTypes from 'prop-types';

import './style.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../Modal';

const ServiceModal = ({ service, closeAction }) => {
  // we need categories to display category name
  const categories = useSelector((state) => state.categories.items);

  // we need local state variables to display modal
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState({});

  return (
    <div className="service-modal">
      <MdOutlineClose className="service-modal__close" onClick={closeAction} />
      <div className="service-modal__tags">
        <div
          className="service-modal__tag"
          style={{
            backgroundColor: categories.find(
              (category) => category.id === service.category_id,
            ).color,
          }}
        >
          {categories.find((category) => category.id === service.category_id).name.trim()}
        </div>
        {service.irl && <div className="service-modal__tag">Présentiel</div>}
        {service.online && <div className="service-modal__tag">Visio</div>}
      </div>
      <div className="service-modal__content">
        <h1 className="service-modal__title">{service.title}</h1>
        <p className="service-modal__text">{service.description}</p>
        <p className="service-modal__text">{`${service.duration} minutes`}</p>
        <MapContainer center={[service.latitude, service.longitude]} zoom={13} scrollWheelZoom={false} className="service-modal__map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[service.latitude, service.longitude]}
          />
        </MapContainer>
        <div className="service-modal__mentor">
          <h2 className="service-modal__mentor-title">{`Proposé par : ${service.firstname} ${service.lastname}`}</h2>
          <img className="service-modal__mentor-avatar" src={service.avatar_url} alt="mentor avatar" />
          {service.biography && <p className="service-modal__text">{service.biography}</p>}
        </div>
        <div className="service-modal__button-container">
          {/* We display the modal when showModal is true */}
          {showModal && (
            <Modal
              className="modal--in-parent-modal"
              action={modalAction}
              closeAction={() => setShowModal(false)}
              closeParentAction={closeAction}
            />
          )}
          <button
            type="button"
            className="service-modal__button"
            onClick={() => {
              setModalAction({
                type: 'delete',
                target: 'service',
                role: 'admin',
                id: service.id,
              });
              setShowModal(true);
            }}
          >
            Supprimer
          </button>
          {/* We display publish button only if the service is not published */}
          {!service.is_published && (
          <button
            type="button"
            className="service-modal__button"
            onClick={() => {
              setModalAction({
                type: 'publish',
                target: 'service',
                role: 'admin',
                id: service.id,
              });
              setShowModal(true);
            }}
          >
            Publier
          </button>
          )}
        </div>

      </div>
    </div>
  );
};

ServiceModal.propTypes = {
  closeAction: PropTypes.func.isRequired,
  service: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    irl: PropTypes.bool.isRequired,
    is_published: PropTypes.bool.isRequired,
    category_id: PropTypes.number.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    biography: PropTypes.string,
    avatar_url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceModal;
