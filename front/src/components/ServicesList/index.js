import { MapContainer, TileLayer, Marker, Popup, useMapEvents,useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ServicesCard from 'src/components/ServicesCard';
import Location from 'src/components/Location';
import PropTypes from 'prop-types';

import './style.scss';

const ServicesList = ({ services, title }) => {
  //
  const [position, setPosition] = useState(null)

  // We create a function to set the state position on a mouse over 
  function handleMouseOver(lat, long){
    setPosition([lat, long]);
  }
  // Here a function for leaftlet to fly to the position we've set with handleMouseOver
  function ServicesLocation({pos}) {
    const map = useMap();

    if(pos !== null){
      map.flyTo(pos, 12);
    }

    return null
  }

  return (
      <div className="services">
        <main className="services-container">
  {/* Map section */}
          <div className="services-map-container">
            <MapContainer className="services-map" center={[48.8534, 2.3488]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {services.map(service => (
                <Marker 
                  key={service.id} 
                  position={[
                    service.latitude,
                    service.longitude
                  ]}
                >
                <Popup>
                  <div>
                    <Link to={`/service/${service.id}`} >
                      <h2>{service.title}</h2>
                    </Link>
                    <p className="">
                        {service.description.substring(0, 30)}
                        <Link to={`/service/${service.id}`} >
                          <span className="card-description-span">...lire la suite</span>
                        </Link>
                      </p>
                    <p>
                      {service.firstname}
                      {service.lastname}
                    </p>
                  </div>
                </Popup>
              </Marker>
              ))}
              <ServicesLocation 
                pos={position}
              />
              <Location />
            </MapContainer>
          </div>
  {/* Services section */}
          <article className="services-list">
            <h1 className="services-title">{title}</h1>
              <ul className="services-cards">
              {/* Here we map on services to give all the infos by prop */}
                {services.map((item) =>(
                  <ServicesCard 
                    result={item}
                    key={item.id}
                    onMouseOver={()=> handleMouseOver(item.latitude, item.longitude)}
                  />
                ))}
              </ul>
          </article>
        </main>
      </div>
    );
  };

ServicesList.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    online: PropTypes.bool.isRequired,
    irl: PropTypes.bool.isRequired,
    category_id: PropTypes.number.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    mentor_id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    biography: PropTypes.string,
    avatar_url: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default ServicesList;
