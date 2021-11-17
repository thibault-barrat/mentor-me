/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
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

  const [passwordShown, setPasswordShown] = useState("");
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

  // Here the password toggle handler
  const togglePassword = (name) => {
    // if the prop name is equal to the onClick name  
    // that change the value of passwordShown to show the password writed
    if (name == "password"){
      setPasswordShown("password");
        // if the state is equal to password, when we click again the state will be reset 
        if (passwordShown == "password"){
          setPasswordShown("");
        }
    }
    if (name == "confirmedPassword"){
      setPasswordShown("confirmedPassword");
        if (passwordShown == "confirmedPassword"){
          setPasswordShown("");
        }
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
                  placeholder="Ton nom"
                  value={lastname}
                  onChange={handleChange}
                  required
                />
                <Field
                  type="text"
                  name="firstname"
                  placeholder="Ton prénom"
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
                  placeholder="Ton adresse email"
                  value={email}
                  onChange={handleChange}
                  onBlur={checkEmail}
                  required
                />
                {!validPassword && (
                  <span className="form__error">Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial.</span>
                )}
                <div className="hide-container">
                <Field
                  type={passwordShown == "password" ? "text" : "password"}
                  name="password"
                  placeholder="Ton mot de passe"
                  value={password}
                  onChange={handleChange}
                  onBlur={checkPassword}
                  required
                />
                {passwordShown !== "password" && (
                  <FaRegEyeSlash 
                  onClick={() => togglePassword("password")}
                  size={18}
                  className="hide-container__password"
                />
                )}
                {passwordShown == "password" && (
                  <FaRegEye 
                  onClick={() => togglePassword("password")}
                  size={18}
                  className="hide-container__password"
                />
                )}
                {!validConfirmedPassword && (
                  <span className="form__error">Les mots de passe doivent être identiques.</span>
                )}
                <Field
                  type={passwordShown == "confirmedPassword" ? "text" : "password"}
                  name="confirmedPassword"
                  placeholder="Confirmer le mot de passe"
                  value={confirmedPassword}
                  onChange={setConfirmedPassword}
                  onBlur={checkConfirmedPassword}
                  required
                />
                {passwordShown !== "confirmedPassword" && (
                  <FaRegEyeSlash 
                  onClick={() => togglePassword("confirmedPassword")}
                  size={18}
                  className="hide-container__confirmedPassword"
                />
                )}
                {passwordShown == "confirmedPassword" && (
                  <FaRegEye 
                  onClick={() => togglePassword("confirmedPassword")}
                  size={18}
                  className="hide-container__confirmedPassword"
                />
                )}
                </div>
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
                  <span>J'accepte les <Link to="/conditions-generales" className="checkbox__link">conditions générales </Link> et la <Link to="/politique-confidentialite" className="checkbox__link">politique de confidentialité</Link></span>
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
