import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoginField, submitLogin } from '../../actions/user';
import Field from '../../components/Field';

import './style.scss';

export default function Connect() {
  const {
    email, password, logged, errors,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    dispatch(changeLoginField(value, name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitLogin());
  };

  const history = useHistory();

  // Redirect to home after connection
  useEffect(() => {
    if (logged) {
      history.replace('/');
    }
  }, [logged]);

  return (
    <div className="connect">
      <form
        onSubmit={handleSubmit}
      >
        {errors.mail && <span className="connect__error">Cet utilisateur n'existe pas.</span>}
        <Field
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          required

        />
        {errors.password && <span className="connect__error">Mauvais mot de passe;</span>}
        <Field
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handleChange}
          required

        />
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
          Vous n'avez pas de compte ?
        </Link>
      </form>
    </div>
  );
}
