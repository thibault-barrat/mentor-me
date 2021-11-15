/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from 'src/components/Loading';
import { changeRegisterField, submitNewUser } from '../../actions/user';
import './style.scss';
import Field from '../../components/Field';

export default function Register() {
  const { email, password, firstname, lastname, redirect, loading } = useSelector(
    (state) => state.user.register,
  );

  // to manage error when email already used
  // we need the registerMail boolean from the state
  const { registerMail } = useSelector((state) => state.user.errors);

  const history = useHistory();
  // Redirect to connect page after register
  useEffect(() => {
    if (redirect) {
      history.replace('/connexion');
    }
  }, [redirect]);

  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    dispatch(changeRegisterField(value, name));
  };

  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedEmailDiff, setAcceptedEmailDiff] = useState(false);

  // state variables to know if the fields are valid or not
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validConfirmedPassword, setValidConfirmedPassword] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validPassword && validConfirmedPassword && validEmail) {
      dispatch(submitNewUser());
    }
  };

  // function to verify that the email matches the regex rule
  const checkEmail = (event) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
      setValidEmail(false);
    }
    else setValidEmail(true);
  };

  // function to verify that the password matches the regex rule
  const checkPassword = (event) => {
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/.test(event.target.value)) {
      setValidPassword(false);
    }
    else setValidPassword(true);
  };

  // function to verify that the confirmed password matches the password
  const checkConfirmedPassword = () => {
    if (password !== confirmedPassword) {
      setValidConfirmedPassword(false);
    }
    else setValidConfirmedPassword(true);
  };

  return (
    <div>
      {/* We use ternary operator to display loading component during the API request */}
      {loading ? (
        <Loading />
      )
        : (
          <>
            <div className="container">
              <form onSubmit={handleSubmit} className="right__container">
                <h2 className="form__title">Créer un compte</h2>
                <Field
                  type="text"
                  name="lastname"
                  placeholder="Votre Nom"
                  value={lastname}
                  onChange={handleChange}
                  required
                />
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Votre Prénom"
                  value={firstname}
                  onChange={handleChange}
                  required
                />
                {!validEmail && (
                  <span className="form__error">Ce champ doit contenir un email valide.</span>
                )}
                {registerMail && (
                  <span className="form__error">Cet e-mail est déjà associé à un compte.</span>
                )}
                <Field
                  type="email"
                  name="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={handleChange}
                  onBlur={checkEmail}
                  required
                />
                {!validPassword && (
                  <span className="form__error">Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial.</span>
                )}
                <Field
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handleChange}
                  onBlur={checkPassword}
                  required
                />
                {!validConfirmedPassword && (
                  <span className="form__error">Les mots de passe doivent être identiques.</span>
                )}
                <Field
                  type="password"
                  name="confirmedPassword"
                  placeholder="Confirmer le mot de passe"
                  value={confirmedPassword}
                  onChange={setConfirmedPassword}
                  onBlur={checkConfirmedPassword}
                  required
                />
                <label htmlFor="acceptedTerms" className="checkbox__container">
                  <input
                    className="checkbox"
                    name="acceptedTerms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                  />
                  <span>J'accepte que mon email soit diffusé en cas de proposition d'offre.</span>
                </label>
                <label htmlFor="acceptedEmailDiff" className="checkbox__container">
                  <input
                    className="checkbox"
                    name="acceptedEmailDiff"
                    type="checkbox"
                    checked={acceptedEmailDiff}
                    onChange={(e) => setAcceptedEmailDiff(e.target.checked)}
                    required
                  />
                  <span>J'accepte les conditions générales et la politique de confidentialité</span>
                </label>

                <div className="g-recaptcha" data-sitekey="6LdSsPscAAAAADmH6Q83VWexeO7rsy09eWggHmEy" />

                <button type="submit" className="connect-button">M'inscrire</button>
              </form>

            </div>
          </>
        )}
    </div>
  );
}
