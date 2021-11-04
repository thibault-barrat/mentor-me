import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Field from 'src/components/Field';
import Location from 'src/components/Location';
import './style.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';
// import of leaflet marker icons
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { changeServiceField } from '../../actions/service';

const NewService = () => {
  // we need categories to populate the select field
  const categories = useSelector((state) => state.categories.items);

  // We take data for new service from the state
  const {
    category, title, duration, irl, online, description,
  } = useSelector((state) => state.services.new);

  const dispatch = useDispatch();

  // function to handle the change value in controlled fields
  const handleChange = (value, name) => {
    dispatch(changeServiceField(value, name));
  };

  // We need to re-define the markers in order to correctly import them
  // https://github.com/PaulLeCam/react-leaflet/issues/453
  // eslint-disable-next-line no-underscore-dangle
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });

  return (
    <main className="new-service">
      <div className="new-service__slogan">
        <div className="new-service__container">
          <h1 className="new-service__title">
            Je propose mes compétences
          </h1>
        </div>
      </div>
      <div className="new-service__container">
        <form className="new-service__form">
          <select
            name="category"
            className="new-service__cat-select"
            value={category}
            onChange={(e) => handleChange(e.target.value, e.target.name)}
          >
            <option value="">-- Nom de la catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {/* We transform the first letter to uppercase */}
                {cat.name[0].toUpperCase() + cat.name.substring(1)}
              </option>
            ))}
          </select>
          <Field
            type="text"
            name="title"
            placeholder="Que proposez-vous ?"
            value={title}
            onChange={handleChange}
            required
          />
          <div className="new-service__form-row">
            <Field
              type="number"
              name="duration"
              placeholder="Durée du service proposé (en minutes)"
              value={duration}
              onChange={handleChange}
              required
            />
            <div className="new-service__checkbox-container">
              <label htmlFor="irl" className="new-service__checkbox-label">
                <input
                  className="new-service__checkbox"
                  name="irl"
                  type="checkbox"
                  checked={irl}
                  onChange={(event) => handleChange(event.target.checked, event.target.name)}
                />
                <span>Présentiel</span>
              </label>
              <label htmlFor="online" className="new-service__checkbox-label">
                <input
                  className="new-service__checkbox"
                  name="online"
                  type="checkbox"
                  checked={online}
                  onChange={(event) => handleChange(event.target.checked, event.target.name)}
                />
                <span>Visio</span>
              </label>
            </div>
          </div>
          <label
            className="new-service__description"
            htmlFor="description"
          >
            <span className="new-service__description-label">Description</span>
            <textarea
              type="text"
              placeholder="Décrivez votre proposition, n'hésitez pas à indiquer également vos disponibilités."
              className="new-service__description-textarea"
              value={description}
              name="description"
              onChange={(event) => handleChange(event.target.value, event.target.name)}
            />
          </label>
          <span className="new-service__label">Localisation</span>
          <MapContainer center={[48.856614, 2.3522219]} zoom={13} scrollWheelZoom className="new-service__map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Location />
          </MapContainer>
          <button
            type="submit"
            className="new-service__button"
          >
            Je propose
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewService;
