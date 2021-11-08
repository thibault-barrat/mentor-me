// Npm Import
import {useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

// Local import
import ServicesCard from "./ServicesCard";
//import data from "src/data/services";

// Style
import './style.scss';

export default function Services() {
  // Here we get the initial state from the reducer
  const servicesState = useSelector(state => state.services.items);

  // We use useParams to get the params id from the path on App.js
  const { id } = useParams();

  // We want to show every services for each categories
  // so we need to compare if the service's category_id is = to the category's id 
  const services = servicesState.filter((item) => item.category_id === parseInt(id, 10));

  /* function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  } */

  if (services.length == 0){
    return (
      <p className="empty-list">La catégorie dispose d'aucun échange de compétence pour le moment.</p>
    )
  }
  else {
    return (
      <div className="services">
        <h1 className="services-title">Voici les offres correspondantes à la catégorie </h1>
        <main className="services-container">
{/* Map section */}
          <div className="services-map">
          <MapContainer center={[48.8534, 2.3488]} zoom={13} scrollWheelZoom={true}>
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
              {services.map((item) =>(
                <ServicesCard 
                  result={item}
                  key={item.id}
                />
              ))}
              
            </ul>
          </article>
        </main>
      </div>
    );
  }
  
}
