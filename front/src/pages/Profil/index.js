import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import Field from '../../components/Field';
import { changeProfileField, saveProfile } from '../../actions/user';

export default function profil() {
  // TODO Ajouter loader pendant la reqête POST

  // We take the details user info from the state
  const {
    email, firstname, lastname, bio, phone, fix, avatar,
  } = useSelector((state) => state.user.details);

  // We also need to know the services and the user id to find the services proposed by the user
  const services = useSelector((state) => state.services.items);
  const id = useSelector((state) => state.user.id);
  const proposedServices = services.filter((service) => service.user_id === id);

  // We also need to know the liked services of the user
  const likedServices = useSelector((state) => state.user.likedServices);

  // We also need the categories to display the category image on the service cards
  const categories = useSelector((state) => state.categories.items);

  // Variable readOnly will let us know if the user is modifying his profile or not
  // When readOnly is true all the fields are disabled
  const [readOnly, setReadOnly] = useState(true);

  // Variable validEmail to know if the field is conform to regex
  // When this is false, we can not validate the new data
  const [validEmail, setValidEmail] = useState(true);

  // function to verify that the email matches the regex rule
  const checkEmail = (event) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
      setValidEmail(false);
    }
    else setValidEmail(true);
  };

  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    dispatch(changeProfileField(value, name));
  };

  const handleSubmit = () => {
    if (validEmail) {
      setReadOnly(!readOnly);
      dispatch(saveProfile());
    }
  };

  return (

    <div className="profil">
      <div className="profil__container-top">
        <h1 className="profil__title">Mon profil</h1>
        <div className="profil__bio">
          <label
            className="bio__label"
            htmlFor="bio"
          >
            <span className="bio__label-text">Votre biographie</span>
            <textarea
              type="text"
              placeholder="Votre biographie"
              className="bio__textarea"
              value={bio}
              name="bio"
              onChange={(event) => handleChange(event.target.value, 'bio')}
              disabled={readOnly}
            />
          </label>
        </div>
        <div className="profil__container-avatar">
          <img src={avatar} alt="Avatar du profil" className="profil__avatar" />
          <form>
            <label htmlFor="avatar" className="profil__label-avatar">
              <span className="connect-button-p">Modifier l'avatar</span>
              <input id="avatar" type="file" accept="image/png, image/jpeg" className="profil__input-avatar" />
            </label>
            <button type="submit" className="connect-button-p">Valider</button>
          </form>
        </div>

      </div>
      <div className="profil__container-bottom">
        <div className="profil__container-form">
          {!validEmail && (
            <span className="profil__error">Ce champ doit contenir un email valide.</span>
          )}
          <Field
            type="text"
            name="email"
            placeholder="Votre email"
            value={email}
            disabled={readOnly}
            onChange={handleChange}
            onBlur={checkEmail}
          />
          <Field
            type="text"
            name="firstname"
            placeholder="Votre prénom"
            value={firstname}
            disabled={readOnly}
            onChange={handleChange}
          />
          <Field
            type="text"
            name="lastname"
            placeholder="Votre Nom"
            value={lastname}
            disabled={readOnly}
            onChange={handleChange}
          />
          <Field
            type="text"
            name="fix"
            placeholder="Votre numéro de teléphone fixe"
            value={fix}
            disabled={readOnly}
            onChange={handleChange}
          />
          <Field
            type="text"
            name="phone"
            placeholder="Votre numéro de téléphone portable"
            value={phone}
            disabled={readOnly}
            onChange={handleChange}
          />

          {/* We display button "Valider when readOnly is false
        and we display button "Modifier" when readOnly is true" */}
          {!readOnly && (
            <button
              type="submit"
              className="connect-button-p"
              onClick={handleSubmit}
            >
              Valider
            </button>
          )}
          {readOnly && (
            <button
              type="submit"
              className="connect-button-p"
              onClick={() => setReadOnly(!readOnly)}
            >
              Modifier le profil
            </button>
          )}
          <br />
          {/* TODO SUPPRESSION D'UN PROFIL */}
          <button type="submit" className="connect-button-p">Supprimer mon profil</button>
        </div>

        {/* We display proposed services only if proposedServices contains items */}
        {proposedServices.length > 0 && (
          <div className="profil__container-ann">
            <h1 className="profil__subtitle">J'ai proposé :</h1>

            {proposedServices.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <div className="proposed__card">
                  <span className="card__name">{service.title}</span>
                  <img
                    className="proposed__img"
                    // Here we will use the image of the category of the service
                    src={categories.find((category) => category.id === service.category_id).image}
                    alt={service.title}
                  />
                </div>
              </Link>
            ))}

            {/* <button type="submit" className="connect-button">voir plus</button> */}
          </div>
        )}

        {/* We display liked services only if likedServices contains items */}
        {likedServices.length > 0 && (
          <div className="profil__container-ann-fav">
            <h1 className="profil__subtitle">Mes annonces favorites :</h1>
            {likedServices.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <div className="proposed__card">
                  <span className="card__name">{service.title}</span>
                  <img
                    className="proposed__img"
                    // Here we will use the image of the category of the service
                    src={categories.find((category) => category.id === service.category_id).image}
                    alt={service.title}
                  />
                </div>
              </Link>
            ))}
            {/* <button type="submit" className="connect-button">voir plus</button> */}
          </div>
        )}
      </div>
    </div>
  );
}
