/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
import { useSelector } from 'react-redux';
import './style.scss';
import DecImage from '/src/assets/images/business-gfb594ee9b_1280.jpg';
import Field from '../../components/Field';

export default function profil() {
  const { email, password, firstname, lastname } = useSelector(
    (state) => state.user.register,
  );
  return (

    <div className="container">
      <div className="container__top">
        <h1>A propos</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Sint accusantium reiciendis quos officia
          repudiandae harum, consequuntur delectus doloribus numquam,
          expedita minima non nisi laboriosam quidem qui ad
          impedit! Reprehenderit, quae?
        </p>
        <img src={DecImage} alt="montrant un pannel de compétences" className="prof__img" />
      </div>
      <div className="container__bottom">
        <Field
          type="text"
          name="email"
          placeholder="Votre adresse email"
          value={email}
          disabled
          required
        />
        <Field
          type="text"
          name="firstname"
          placeholder="Votre prénom"
          value={firstname}
          disabled
          required
        />
        <Field
          type="text"
          name="lastname"
          placeholder="Votre Nom"
          value={lastname}
          disabled
          required
        />
        <Field
          type="text"
          name="ville"
          placeholder="Votre ville"
          disabled
          required
        />
        <Field
          type="text"
          name="Tel.fixe"
          placeholder="Votre numéro de teléphone fixe"
          disabled
          required
        />
        <Field
          type="text"
          name="Tel"
          placeholder="Votre numéro de téléphone portable"
          disabled
          required
        />

        <button type="submit" className="connect-button">Modifier le profil</button>
        <br />
        <button type="submit" className="connect-button">Supprimer mon profil</button>
      </div>

      <div className="container_ann">
        <h1>J'ai proposé :</h1>
        <div className="proposed__card">
          <span className="card__name">card Name</span>
          <img src={DecImage} alt="montrant un pannel de compétences" className="proposed__img" />
        </div>
        <div className="proposed__card">
          <span className="card__name">card Name</span>
          <img src={DecImage} alt="montrant un pannel de compétences" className="proposed__img" />
        </div>
        <div className="proposed__card">
          <span className="card__name">card Name</span>
          <img src={DecImage} alt="montrant un pannel de compétences" className="proposed__img" />
        </div>
        <button type="submit" className="connect-button">voir plus</button>
      </div>
      <div className="container__ann__fav">
        <h1>Mes annonces favorites :</h1>
        <div className="proposed__card">
          <span className="card__name">card Name</span>
          <img src={DecImage} alt="montrant un pannel de compétences" className="proposed__img" />
        </div>
        <div className="proposed__card">
          <span className="card__name">card Name</span>
          <img src={DecImage} alt="montrant un pannel de compétences" className="proposed__img" />
        </div>
        <div className="proposed__card">
          <span className="card__name">card Name</span>
          <img src={DecImage} alt="montrant un pannel de compétences" className="proposed__img" />
        </div>
        <button type="submit" className="connect-button">voir plus</button>
      </div>
    </div>
  );
}
