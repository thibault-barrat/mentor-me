//Npm Import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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

  return (
    <div className="services">
      <h1 className="services-title">Voici les offres correspondantes à la catégorie </h1>
      <main className="services-container">
        <div className="services-map">
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
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
