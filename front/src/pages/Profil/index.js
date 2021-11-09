import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import Field from 'src/components/Field';
import Spinner from 'src/components/Spinner';
import { MdDelete } from 'react-icons/md';
import {
  changeProfileField,
  saveProfile,
  saveImage,
  sendImage,
  logout,
  deleteProfile,
} from '../../actions/user';
import { deleteService } from '../../actions/service';

export default function profil() {
  // We take the details user info from the state
  const {
    email, firstname, lastname, bio, phone, fix, avatar, uploadedImage, loadingAvatar,
  } = useSelector((state) => state.user.details);

  // We take the logged boolean from the state
  const { logged } = useSelector((state) => state.user);

  // We also need to have the loading state during a service delete request
  const { loadingDelete } = useSelector((state) => state.services.loadingDelete);

  // We also need to know the services and the user id to find the services proposed by the user
  const services = useSelector((state) => state.services.items);
  const id = useSelector((state) => state.user.id);
  const [proposedServices, setProposedServices] = useState([]);
  useEffect(() => {
    setProposedServices(services.filter((service) => service.mentor_id === id));
  }, [services]);

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

  // Variable validImage to know if the uploaded avatar is not too big
  const [validImage, setValidImage] = useState(true);

  // function to verify that the email matches the regex rule
  const checkEmail = (event) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
      setValidEmail(false);
    }
    else setValidEmail(true);
  };

  const dispatch = useDispatch();

  // function to handle new avatar image upload
  const handleImageUpload = (event) => {
    const file = event.target.files;
    if (file) {
      if (file[0].size > 500000) {
        setValidImage(false);
      }
      else {
        setValidImage(true);
        // if image is valid, we dispatch an action to put image in state
        dispatch(saveImage(file[0]));
      }
    }
  };

  // when uploadedImage is modified in state, we dispatch an action to do the patch request
  useEffect(() => {
    // we check that uploaded image is not null before to send it
    if (uploadedImage !== null) {
      dispatch(sendImage());
    }
  }, [uploadedImage]);

  // function to handle the change value in input controlled fields
  const handleChange = (value, name) => {
    dispatch(changeProfileField(value, name));
  };

  // function to handle submission of new profile data
  // we need to check that email is valid before submission
  const handleSubmit = () => {
    if (validEmail) {
      setReadOnly(!readOnly);
      dispatch(saveProfile());
    }
  };

  // function to handle click on log out button
  // and dispatch an action to log out the user
  const handleLogout = () => {
    dispatch(logout());
  };

  // function to handle click on delete account button
  // and dispatch an action to delete the user
  const handleDeleteProfile = () => {
    dispatch(deleteProfile());
  };

  // function to handle click on delete service button
  // and dispatch an action to delete the service
  const handleDeleteService = (serviceId) => {
    dispatch(deleteService(serviceId));
  };

  const history = useHistory();

  // Redirect to home after logout
  useEffect(() => {
    // If the user lauched a logout action and logged is false
    // he will be redirected to the home page
    if (!logged) {
      history.replace('/');
    }
  }, [logged]);

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
          {/* We use ternary operator to display a spinner when sending new avatar to the API */}
          {loadingAvatar ? (
            <Spinner />
          ) : (
            <>
              <img src={avatar} alt="Avatar du profil" className="profil__avatar" />
              <form>
                {!validImage && <span className="profil__error">La taille de l'image doit être inférieure à 500Ko</span>}
                <label htmlFor="avatar" className="profil__label-avatar">
                  <span className="connect-button-p">Modifier l'avatar</span>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="profil__input-avatar"
                    onChange={handleImageUpload}
                  />
                </label>
              </form>
            </>
          )}
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
            value={String(fix)}
            disabled={readOnly}
            onChange={handleChange}
          />
          <Field
            type="text"
            name="phone"
            placeholder="Votre numéro de téléphone portable"
            value={String(phone)}
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
          <button type="submit" className="connect-button-p" onClick={handleDeleteProfile}>Supprimer mon profil</button>
          <button type="submit" className="connect-button-p" onClick={handleLogout}>Se déconnecter</button>
        </div>

        {/* We display proposed services only if proposedServices contains items */}
        {proposedServices.length > 0 && (
          <div className="profil__container-ann">
            <h1 className="profil__subtitle">J'ai proposé :</h1>

            {proposedServices.map((service) => (
              <div key={service.id} className="proposed__card">
                <Link className="card__link" to={`/service/${service.id}`}>
                  <span className="card__name">{service.title}</span>
                  <img
                    className="proposed__img"
                    // Here we will use the image of the category of the service
                    src={categories.find((category) => category.id === service.category_id).image}
                    alt={service.title}
                  />
                </Link>
                <MdDelete
                  className="proposed__delete"
                  onClick={() => handleDeleteService(service.id)}
                />
              </div>
            ))}

            {/* <button type="submit" className="connect-button">voir plus</button> */}
          </div>
        )}

        {/* We display liked services only if likedServices contains items */}
        {likedServices.length > 0 && (
          <div className="profil__container-ann-fav">
            <h1 className="profil__subtitle">Mes annonces favorites :</h1>
            {likedServices.map((service) => (
              // We use ternary operator to display spinner during the delete request
              loadingDelete ? (
                <Spinner />
              ) : (
                <Link key={service.id} to={`/service/${service.id}`}>
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
              )
            ))}
            {/* <button type="submit" className="connect-button">voir plus</button> */}
          </div>
        )}
      </div>
    </div>
  );
}
