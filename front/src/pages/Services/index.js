//Npm Import
import {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'

//Local import
import ServicesCard from "./ServicesCard";
import data from "src/data/services";

//Style
import './style.scss';

export default function Services() {

  const jsxServiceCard = data.map((item)=>(
    <ServicesCard 
      key={item.id}

      title={item.title}
      duration={item.duration}
      description={item.description}
      disponibility={item.disponibility}

    />
  ));

  function LocationMarker() {
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
  }


  return (
    <div className="services">
      <h1 className="services-title">Voici les offres correspondantes à la catégorie </h1>
      <main className="services-container">
        <div className="services-map">
        <MapContainer center={[48.8534, 2.3488]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         {/*  <Marker position={[48.8534, 2.3488]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          <LocationMarker />
        </MapContainer>
        </div>
        <article className="services-cards">
          <ul>
            {jsxServiceCard}
          </ul>
        </article>
      </main>
    </div>
  );
}
