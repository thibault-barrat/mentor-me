import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import Field from 'src/components/Field';
import Spinner from 'src/components/Spinner';
import Modal from 'src/components/Modal';
import { MdDelete } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  changeProfileField,
  saveProfile,
  saveImage,
  sendImage,
  logout,
} from '../../actions/user';

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

  // We also need to know the id of liked services by the user
  const likedServicesId = useSelector((state) => state.user.likedServices);
  // To obtain liked services, we filter the services by the likedServicesId
  const likedServices = services.filter(
    (service) => likedServicesId.some((likedService) => likedService.service_id === service.id),
  );

  // We also need the categories to display the category image on the service cards
  const categories = useSelector((state) => state.categories.items);

  // Variable readOnly will let us know if the user is modifying his profile or not
  // When readOnly is true all the fields are disabled
  const [readOnly, setReadOnly] = useState(true);

  // Variable validEmail to know if the field is conform to regex
  // When this is false, we can not validate the new data
  const [validEmail, setValidEmail] = useState(true);

  // Variable validPhone and validFix to know if the field is conform to regex
  // When this is false, we can not validate the new data
  const [validPhone, setValidPhone] = useState(true);
  const [validFix, setValidFix] = useState(true);

  // Variable validImage to know if the uploaded avatar is not too big
  const [validImage, setValidImage] = useState(true);

  // function to verify that the email matches the regex rule
  const checkEmail = (event) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
      setValidEmail(false);
    }
    else setValidEmail(true);
  };

  // function to verify that the phone matches the regex rule
  const checkPhone = (event) => {
    if (!/\+(?:[0-9]?){6,14}[0-9]$/.test(event.target.value)) {
      setValidPhone(false);
    }
    else setValidPhone(true);
  };

  // function to verify that the fix matches the regex rule
  const checkFix = (event) => {
    if (!/\+(?:[0-9]?){6,14}[0-9]$/.test(event.target.value)) {
      setValidFix(false);
    }
    else setValidFix(true);
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
    // for fix and phone, we need to have the phone number with international prefix
    // if the number starts with 0, we replace it by +33
    if (name === 'fix' || name === 'phone') {
      if (value.charAt(0) === '0') {
        const newValue = `+33${value.substring(1)}`;
        dispatch(changeProfileField(newValue, name));
      }
      else {
        dispatch(changeProfileField(value, name));
      }
    }
    else {
      dispatch(changeProfileField(value, name));
    }
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

  const history = useHistory();

  // Redirect to home after logout
  useEffect(() => {
    // If the user lauched a logout action and logged is false
    // he will be redirected to the home page
    if (!logged) {
      history.replace('/');
    }
  }, [logged]);

  // we need local state variables to display modal
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState({});

  return (

    <main className="profil">
      {/* We display the modal when showModal is true */}
      {showModal && (
        <Modal
          action={modalAction}
          closeAction={() => setShowModal(false)}
        />
      )}
      <h1 className="profil__title">Mon profil</h1>
      <div className="profil__container">
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
              value={bio || ''}
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
        <div className="profil__container-form">
          {/* Currently, email can not be modfied in back-end, so we let it disabled */}
          {!validEmail && (
            <span className="profil__error">Ce champ doit contenir un email valide.</span>
          )}
          <Field
            type="text"
            name="email"
            placeholder="Votre email"
            value={email}
            disabled
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
          {!validFix && (
            <span className="profil__error">Le numéro de téléphone doit être au format international: +33...</span>
          )}
          <Field
            type="text"
            name="fix"
            placeholder="Votre numéro de teléphone fixe"
            value={fix}
            disabled={readOnly}
            onChange={handleChange}
            onBlur={checkFix}
          />
          {!validPhone && (
            <span className="profil__error">Le numéro de téléphone doit être au format international: +33...</span>
          )}
          <Field
            type="text"
            name="phone"
            placeholder="Votre numéro de téléphone portable"
            value={phone}
            disabled={readOnly}
            onChange={handleChange}
            onBlur={checkPhone}
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
          <button
            type="submit"
            className="connect-button-p"
            onClick={() => {
              setModalAction({
                type: 'delete',
                target: 'user',
                role: 'user',
                id: id,
              });
              setShowModal(true);
            }}
          >
            Supprimer mon profil
          </button>
          <button
            type="submit"
            className="connect-button-p"
            onClick={handleLogout}
          >
            Se déconnecter
          </button>
        </div>

        {/* We use the react tabs library to display the proposed services
          and the liked services */}
        <Tabs className="profil__tabs-container">
          <TabList className="profil__tabs">
            <Tab>Services proposés</Tab>
            <Tab>Services aimés</Tab>
          </TabList>

          <TabPanel>
            <div className="profil__container-ann">
              {/* We display proposed services only if proposedServices contains items */}
              {proposedServices.length === 0 ? (
                <p>Vous n'avez proposé aucun service</p>
              ) : (
                proposedServices.map((service) => (
                  // We use ternary operator to display spinner during the delete request
                  loadingDelete ? (
                    <Spinner />
                  ) : (
                    <div key={service.id} className="proposed__card">
                      <Link className="card__link" to={`/service/${service.id}`}>
                        <span className="card__name">{service.title}</span>
                        <img
                          className="proposed__img"
                          // Here we will use the image of the category of the service
                          src={categories.find(
                            (category) => category.id === service.category_id,
                          ).image}
                          alt={service.title}
                        />
                      </Link>
                      <MdDelete
                        className="proposed__icon"
                        onClick={() => {
                          setModalAction({
                            type: 'delete',
                            target: 'service',
                            role: 'user',
                            id: service.id,
                          });
                          setShowModal(true);
                        }}
                      />
                    </div>
                  )
                ))
              )}
              {/* <button type="submit" className="connect-button">voir plus</button> */}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="profil__container-ann">
              {/* We display liked services only if likedServices contains items */}
              {likedServices.length === 0 ? (
                <p>Vous n'avez pas encore de favoris</p>
              ) : (
                likedServices.map((service) => (
                  <div key={service.id} className="proposed__card">
                    <Link className="card__link" to={`/service/${service.id}`}>
                      <span className="card__name">{service.title}</span>
                      <img
                        className="proposed__img"
                        // Here we will use the image of the category of the service
                        src={categories.find(
                          (category) => category.id === service.category_id,
                        ).image}
                        alt={service.title}
                      />
                    </Link>
                    <AiFillHeart
                      className="proposed__icon"
                      onClick={() => {
                        setModalAction({
                          type: 'unlike',
                          target: 'service',
                          role: 'user',
                          id: service.id,
                        });
                        setShowModal(true);
                      }}
                    />
                  </div>
                ))
              )}
              {/* <button type="submit" className="connect-button">voir plus</button> */}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </main>
  );
}
