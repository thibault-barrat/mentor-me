// Npm import
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

// Local import
import { changeLoginField, submitLogin } from '../../actions/user';
import Field from '../../components/Field';

// Style
import './style.scss';

export default function Connect() {
  // Here we get the initial state from the reducer with 'useSelector'
  const {
    email, password, logged, errors,
  } = useSelector((state) => state.user);
  
  // Here we create a hook to set the passwordShown to a boolean
  const [passwordShown, setPasswordShown] = useState(false);

  // Here the password toggle handler
  const togglePassword = () => {
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    
  };
  // We use dispatch to modify the state
  const dispatch = useDispatch();

  // Here the function we use send to our Prop to change the values 'email' and 'password'
  // We also get the name to specify which input we want to write on
  const handleChange = (value, name) => {
    dispatch(changeLoginField(value, name));
  };

  // Here the function to submit our form
  const handleSubmit = (event) => {
    // The event.preventDefault() avoid the reloading of our page on the submit
    event.preventDefault();
    dispatch(submitLogin());
  };

  const history = useHistory();

  // Redirect to home after connection
  useEffect(() => {
    // If the user is logged he will be redirected to the home page
    if (logged) {
      history.replace('/');
    }
  }, [logged]);

  return (
    <div className="connect">
      <h1 className="connect__title">Se connecter</h1>
      <form
        onSubmit={handleSubmit}
      >
        {errors.mail && <span className="connect__error">Cet utilisateur n'existe pas.</span>}
        <Field
          type="email"
          name="email"
          placeholder="Ton email"
          value={email}
          onChange={handleChange}
          required

        />
        {errors.password && <span className="connect__error">Mauvais mot de passe;</span>}
        <div className="container-hide">
        <Field
          type={passwordShown ? "text" : "password"}
          name="password"
          placeholder="Ton mot de passe"
          value={password}
          onChange={handleChange}
          required
        />
        {!passwordShown && (
          <FaRegEyeSlash 
            onClick={togglePassword}
            size={18}
            className="container-hide__passwordConnect"
          />
        )}
        {passwordShown  && (
          <FaRegEye 
            onClick={togglePassword}
            size={18}
            className="container-hide__passwordConnect"
          />
        )}
        </div>
        <button
          type="submit"
          className="connect-button"
        >
          Me connecter
        </button>
        <Link
          className="connect-link"
          to="/inscription"
        >
          Tu n'as pas de compte ?
        </Link>
      </form>
    </div>
  );
}
