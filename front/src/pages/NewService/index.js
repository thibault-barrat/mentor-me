import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Field from 'src/components/Field';
import Location from 'src/components/Location';
import Loading from 'src/components/Loading';
import './style.scss';
import {
  MapContainer,
  TileLayer,
} from 'react-leaflet';
import NewServiceMarker from 'src/components/NewServiceMarker';
import { changeServiceField, submitService } from '../../actions/service';

const NewService = () => {
  // we need categories to populate the select field
  const categories = useSelector((state) => state.categories.items);

  // we need user location to center the map
  const userLatitude = useSelector((state) => state.user.latitude);
  const userLongitude = useSelector((state) => state.user.longitude);

  // We take data for new service from the state
  const {
    category, title, duration, irl, online, description, location, loading,
  } = useSelector((state) => state.services.new);

  // we create local state variables to know if each field is valid
  // and if the form is valid
  const [categoryValid, setCategoryValid] = useState(true);
  const [titleValid, setTitleValid] = useState(true);
  const [durationValid, setDurationValid] = useState(true);
  const [checkboxesValid, setCheckboxesValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [locationValid, setLocationValid] = useState(true);
  const [formValid, setFormValid] = useState(false);

  // function to check validity of each field
  const checkCategory = () => {
    if (category === '') {
      setCategoryValid(false);
      return false;
    }
    setCategoryValid(true);
    return true;
  };

  const checkTitle = () => {
    if (title === '') {
      setTitleValid(false);
      return false;
    }
    setTitleValid(true);
    return true;
  };

  const checkDuration = () => {
    if (duration === '') {
      setDurationValid(false);
      return false;
    }
    setDurationValid(true);
    return true;
  };

  const checkCheckboxes = () => {
    if (irl === false && online === false) {
      setCheckboxesValid(false);
      return false;
    }
    setCheckboxesValid(true);
    return true;
  };

  const checkDescription = () => {
    if (description === '') {
      setDescriptionValid(false);
      return false;
    }
    setDescriptionValid(true);
    return true;
  };

  const checkLocation = () => {
    if (Object.keys(location).length === 0) {
      setLocationValid(false);
      return false;
    }
    setLocationValid(true);
    return true;
  };

  // we want to check location when it changed
  // to remove error when user has clicked on the map
  useEffect(() => {
    if (Object.keys(location).length !== 0) {
      checkLocation();
    }
  }, [location]);

  // function to check if form is valid
  const checkForm = () => {
    if (checkCategory()
      && checkTitle()
      && checkDuration()
      && checkCheckboxes()
      && checkDescription()
      && checkLocation()) {
      setFormValid(true);
    }
    else {
      setFormValid(false);
    }
  };

  const dispatch = useDispatch();

  // function to handle the change value in controlled fields
  const handleChange = (value, name) => {
    dispatch(changeServiceField(value, name));
  };

  // function to handle submission of new service
  const handleSubmit = async (e) => {
    e.preventDefault();
    checkForm();
  };

  // if form is valid, we can submit it
  useEffect(() => {
    if (formValid) {
      dispatch(submitService());
    }
  }, [formValid]);

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
        {/* If loading is true, we display the loading component */}
        {loading && <Loading />}
        {/* We display the form if loading is false */}
        {!loading && (
          <form className="new-service__form">
            <div className="new-service__field-container">
              {!categoryValid && <span className="new-service__error">Veuillez choisir une catégorie</span>}
              <select
                name="category"
                className="new-service__cat-select"
                value={category}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                onBlur={checkCategory}
                required
              >
                <option value="">-- Nom de la catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {/* We transform the first letter to uppercase */}
                    {cat.name[0].toUpperCase() + cat.name.substring(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="new-service__field-container">
              {!titleValid && <span className="new-service__error">Veuillez choisir un titre</span>}
              <Field
                type="text"
                name="title"
                placeholder="Que proposez-vous ?"
                value={title}
                onChange={handleChange}
                onBlur={checkTitle}
                required
              />
            </div>
            <div className="new-service__field-container new-service__field-container--flex">
              <div className="new-service__form-row">
                <div className="new-service__field-container new-service__field-container--flex">
                  {!durationValid && <span className="new-service__error">Veuillez choisir une durée</span>}
                  <Field
                    type="number"
                    name="duration"
                    placeholder="Durée du service proposé (en minutes)"
                    value={duration}
                    onChange={handleChange}
                    onBlur={checkDuration}
                    required
                  />
                </div>
                <div className="new-service__checkbox-container">
                  {!checkboxesValid && <span className="new-service__error new-service__error--checkbox">Veuillez cocher au moins une des deux cases</span>}
                  <label htmlFor="irl" className="new-service__checkbox-label">
                    <input
                      className="new-service__checkbox"
                      name="irl"
                      type="checkbox"
                      checked={irl}
                      onChange={(event) => handleChange(event.target.checked, event.target.name)}
                      onBlur={checkCheckboxes}
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
                      onBlur={checkCheckboxes}
                    />
                    <span>Visio</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="new-service__field-container">
              {!descriptionValid && <span className="new-service__error">Veuillez décrire votre service</span>}
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
                  onBlur={checkDescription}
                  required
                />
              </label>
            </div>
            <div className="new-service__field-container">
              {!locationValid && <span className="new-service__error">Veuillez définir une localisation</span>}
              <span className="new-service__label">Localisation (cliquez sur la carte là où vous souhaitez localiser votre service)</span>
              <MapContainer center={[userLatitude || 48.856614, userLongitude || 2.3522219]} zoom={13} scrollWheelZoom className="new-service__map">
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* We use Location component to find user location
              when his latitude and longitude are null */}
                {!userLatitude && !userLongitude && <Location />}
                <NewServiceMarker />
              </MapContainer>
            </div>
            <button
              type="submit"
              className="new-service__button"
              onClick={handleSubmit}
            >
              Je propose
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default NewService;
