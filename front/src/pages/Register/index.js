/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import React from 'react';
import './style.scss';
// eslint-disable-next-line import/no-unresolved
import DecImage from '/src/assets/images/business-gfb594ee9b_1280.jpg';
import Field from '../../components/Field';

export default function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmedPassword, setConfirmedPassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [acceptedEmailDiff, setAcceptedEmailDiff] = React.useState(false);


  const handleSubmit = (event) => {
    console.log(`
      Email: ${email}
      Password: ${password}
      Firstname: ${firstname}
      LastName: ${lastname}
      Accepted Terms: ${acceptedTerms}
      Accepted Emaildiff: ${acceptedEmailDiff}
    `);

    event.preventDefault();
  }

  return(
    <div>
    <div className="container">
      <div className="left__container">
        <img src={DecImage} alt="montrant un pannel de compétences" className="desc__img" />
        <div className="left__text__container">
          <p className="left__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere animi totam in sint similique autem, rem doloremque cumque, praesentium aperiam quae? Recusandae magni qui, quae enim at maxime ratione possimus sequi! Ab perferendis laborum at officiis quae facilis velit ipsum doloribus, a voluptatibus atque suscipit repudiandae neque dolore ea consequatur.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="right__container">
        <h2 className="form__title">Créer un compte</h2>
        <Field 
          name="Nom"
          placeholder="votre Nom"
          value={lastname}
          
        />
        <Field 
          name="Prénom"
          placeholder="votre Prénom"
          value={firstname}
          
        />
        <Field 
          name="email"
          placeholder="votre adresse email"
          value={email}
          
        />
        <Field
          name="password"
          placeholder="Mot de passe"
          value={password}

        />
        <Field
          name="confirmedPassword"
          placeholder="Confirmer le mot de passe"
          value={confirmedPassword}

        />
        

        <div class="g-recaptcha" data-sitekey="6LdSsPscAAAAADmH6Q83VWexeO7rsy09eWggHmEy" />
         
        <button type="submit" className="connect-button">M'inscrire</button>
      </form>
      
    </div>
  </div>
  );

}
