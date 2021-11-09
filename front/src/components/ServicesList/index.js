import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
import ServicesCard from 'src/components/ServicesCard';
import PropTypes from 'prop-types';

import './style.scss';

const ServicesList = ({ services }) => (
  <>
    {/* Map section */}
    <div className="services-map">
      <MapContainer center={[48.8534, 2.3488]} zoom={13} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {services.map((service) => (
          <Marker
            key={service.id}
            position={[
              service.latitude,
              service.longitude,
            ]}
          >
            <Popup>
              <div>
                <h2>{service.title}</h2>
                <p>
                  {service.firstname}
                  {service.lastname}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>

    {/* Services section */}
    <article className="services-cards">
      <ul>
        {/* Here we map on services to give all the infos by prop */}
        {services.map((item) => (
          <ServicesCard
            result={item}
            key={item.id}
          />
        ))}

      </ul>
    </article>
  </>
);

ServicesList.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    irl: PropTypes.bool.isRequired,
    category_id: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    mentor_id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    biography: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  })).isRequired,
};

export default ServicesList;
